/* -------------------------------------------------- *
 * SEARCH                                             *
 * -------------------------------------------------- */

import dialogPolyfill from "dialog-polyfill";
import createSearch from "js-inverted-index";
import { FunctionComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Bookmark } from "../lib";

type SearchProps = { visible: boolean; onSetVisible: (value: boolean) => void };
export const Search: FunctionComponent<SearchProps> = ({
  visible,
  onSetVisible: setVisible,
}) => {
  const [searchFn, setSearchFn] = useState<(term: string) => [] | undefined>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Bookmark[]>([]);
  const [focusedResult, setFocusedResult] = useState(0);
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogPolyfill.registerDialog(dialogRef.current);
  }, []);

  // Fetches the pre-generated results and documents lists from the server and
  // initalizes the search client
  useEffect(() => {
    Promise.all([
      fetch("/data/_all.json").then((r) => r.json()),
      fetch("/data/_search.json").then((r) => r.json()),
    ]).then(([documents, index]) => {
      const { search: searchFn, hydrate } = createSearch();
      hydrate(index, documents);
      setSearchFn(() => searchFn);
    });
  }, []);

  useEffect(() => {
    // Sync dialog state with visibility
    if (visible) dialogRef.current.showModal();
    else dialogRef.current.close();

    // Manage the hotkey for opening the search modal
    const onSearchHotkey = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        setVisible(!visible);
      }
    };

    window.addEventListener("keydown", onSearchHotkey);
    return () => window.removeEventListener("keydown", onSearchHotkey);
  }, [visible]);

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

    window.addEventListener("keydown", onFocusMoved);
    return () => window.removeEventListener("keydown", onFocusMoved);
  }, [visible, focusedResult, results]);

  // Results list or empty state if the query didn't lead to any results
  let resultsEl = null;
  if (results && results.length > 0) {
    resultsEl = (
      <ul>
        {results.map((bookmark, i) => (
          <li key={bookmark.url}>
            <a
              className={i === focusedResult ? "focus" : null}
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
    <dialog
      className="search-dialog"
      onClose={() => setVisible(false)}
      ref={dialogRef}
    >
      <input onInput={onSearch} placeholder="Search for ..." value={query} />
      {resultsEl}
    </dialog>
  );
};
