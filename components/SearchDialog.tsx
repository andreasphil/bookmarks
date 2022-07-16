/** @jsx h */
import createSearch from "js-inverted-index/index.ts";
import type { Search, SearchIndexDump } from "js-inverted-index/types.ts";
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { Bookmark } from "../utils/lib.ts";

type SearchFn = Search<Bookmark>["search"] | undefined;

export default function SearchDialog(props: {
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
      <ul>
        {results.map((bookmark, i) => (
          <li key={bookmark.url}>
            <a
              className={i === focusedResult ? "focus" : undefined}
              f-transition
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
      <div className="search-dialog__empty" f-trim="both">
        <h3>😵‍💫</h3>
        <p className="text-c-variant">Sorry, couldn&rsquo;t find anything.</p>
      </div>
    );
  }

  return (
    <dialog className="search-dialog" onClose={onDialogClose} ref={dialogRef}>
      <input onInput={onSearch} placeholder="Search for ..." value={query} />
      {resultsEl}
    </dialog>
  );
}
