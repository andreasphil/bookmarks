import { BOOKMARKS, META, type Bookmark } from "$/utils/lib.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import createSearch, {
  type Search,
  type SearchIndexDump,
} from "js-inverted-index/mod.ts";
import type { RenderableProps } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

/* -------------------------------------------------- *
 * Search dialog                                      *
 * -------------------------------------------------- */

type SearchFn = Search<Bookmark>["search"] | undefined;

function SearchDialog(props: {
  visible: boolean;
  onSetVisible: (value: boolean) => void;
}) {
  const { visible, onSetVisible: setVisible } = props;
  const [searchFn, setSearchFn] = useState<SearchFn>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Bookmark[]>([]);
  const [focusedResult, setFocusedResult] = useState(0);
  const [dialogIsOpen, setDialogIsOpen] = useState(visible);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Fetches the pre-generated results and documents lists from the server and
  // initalizes the search client
  useEffect(() => {
    fetch("/api/search")
      .then((r) => r.json())
      .then((r: { documents: Bookmark[]; index: SearchIndexDump }) => {
        const { search: searchFn, hydrate } = createSearch<Bookmark>();
        hydrate(r.index, r.documents);
        setSearchFn(() => searchFn);
      });
  }, []);

  useEffect(() => {
    // Toggle the dialog when visibility changes. Need to double check with
    // the dialogIsOpen flag because attempting to close a closed dialog or
    // open an opened dialog will throw an exception in some browsers.
    if (visible && !dialogIsOpen) {
      dialogRef.current?.showModal();
      setDialogIsOpen(true);
    } else if (!visible && dialogIsOpen) {
      dialogRef.current?.close();
      setDialogIsOpen(false);
    }

    // Manage the hotkey for opening the search modal
    const onSearchHotkey = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        setVisible(!visible);
      }
    };

    addEventListener("keydown", onSearchHotkey);
    return () => removeEventListener("keydown", onSearchHotkey);
  }, [visible]);

  // Sync dialog state with visibility
  const onDialogClose = () => {
    setDialogIsOpen(false);
    setVisible(false);
  };

  // Updates the search query on inputs.
  const onSearch = (event: Event) => {
    event.preventDefault();
    if (event.target instanceof HTMLInputElement) {
      setQuery(event.target.value);
    }
  };

  // Updates the results list whenever the query changes
  useEffect(() => {
    if (!searchFn || !query) setResults([]);
    else setResults(searchFn(query));
  }, [query, searchFn]);

  // Resets the focused result when the results list changes
  useEffect(() => setFocusedResult(0), [results]);

  // Manages hotkeys for navigating and opening search results
  useEffect(() => {
    if (!visible) return;

    const onFocusMoved = (event: KeyboardEvent) => {
      let handled = false;
      if (event.key === "ArrowUp") {
        setFocusedResult((state) => Math.max(0, state - 1));
        handled = true;
      } else if (event.key === "ArrowDown") {
        setFocusedResult((state) => Math.min(results.length - 1, state + 1));
        handled = true;
      } else if (event.key === "Enter") {
        if (!results[focusedResult].url) return;
        window.open(
          results[focusedResult].url,
          event.metaKey ? "_blank" : "_self"
        );
      }

      if (handled) event.preventDefault();
    };

    addEventListener("keydown", onFocusMoved);
    return () => removeEventListener("keydown", onFocusMoved);
  }, [visible, focusedResult, results]);

  // Results list or empty state if the query didn't lead to any results
  let resultsEl = null;
  if (results && results.length > 0) {
    resultsEl = (
      <ul className="search-dialog__results">
        {results.map((bookmark, i) => (
          <li className="search-dialog__result" key={bookmark.url}>
            <a
              className={i === focusedResult ? "focus" : undefined}
              href={bookmark.url}
              onFocus={() => setFocusedResult(i)}
            >
              <span className="search-dialog__icon">{bookmark.icon}</span>
              <small className="search-dialog__text">
                <strong>{bookmark.title}</strong>
                <span className="text-c-variant">{bookmark.description}</span>
              </small>
            </a>
          </li>
        ))}
      </ul>
    );
  } else if (query) {
    resultsEl = (
      <div className="search-dialog__empty" data-trim="both">
        <h3>😵‍💫</h3>
        <p className="text-c-variant">Sorry, couldn&rsquo;t find anything.</p>
      </div>
    );
  }

  return (
    <dialog className="search-dialog" onClose={onDialogClose} ref={dialogRef}>
      <input
        className="search-dialog__input"
        onInput={onSearch}
        placeholder="Search for ..."
        value={query}
      />
      {resultsEl}
    </dialog>
  );
}

/* -------------------------------------------------- *
 * Header island                                      *
 * -------------------------------------------------- */

function HeaderNavItem(
  props: RenderableProps<{
    to: string;
    label?: string;
    title: string;
    color?: string;
    isActive?: boolean;
  }>
) {
  return (
    <li>
      <a
        className={props.color ? `header__item--${props.color}` : undefined}
        data-active={props.isActive}
        href={props.to}
        title={props.title}
      >
        {props.label ? props.label : null}
        {props.children}
      </a>
    </li>
  );
}

export default function Header({ title, url }: { title: string; url: string }) {
  // Add navigation hotkeys to switch between lists by pressing number keys
  const onNavigationHotkey = useCallback((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement || event.metaKey) return;

    let handled = false;
    if (event.key.match(/^[0-9]$/)) {
      const i = Number.parseInt(event.key) - 2;
      if (i === -1) {
        location.href = "/";
        handled = true;
      } else if (i < BOOKMARKS.length) {
        location.href = `/${BOOKMARKS[i].id}`;
        handled = true;
      }
    }

    if (handled) event.preventDefault();
  }, []);

  useEffect(() => {
    if (!IS_BROWSER) return;
    addEventListener("keydown", onNavigationHotkey);
    return () => removeEventListener("keydown", onNavigationHotkey);
  }, []);

  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <header data-container data-trim="top" className="header">
      <hgroup>
        <p>
          <strong>{META.title}</strong>
        </p>
        <h1>{title}</h1>
      </hgroup>
      <nav>
        <ul>
          <li>
            <button
              className="header__button"
              data-variant="ghost"
              disabled={!IS_BROWSER}
              onClick={() => setSearchVisible(true)}
              title="Search"
            >
              🔎
            </button>
          </li>

          <li className="header__divider"></li>

          {/* All other collections */}
          {BOOKMARKS.map((list) => (
            <HeaderNavItem
              to={`/${list.id}`}
              isActive={`/${list.id}` === url}
              label={list.title}
              title={list.title}
            />
          ))}
        </ul>
      </nav>
      {IS_BROWSER ? (
        <SearchDialog visible={searchVisible} onSetVisible={setSearchVisible} />
      ) : null}
    </header>
  );
}
