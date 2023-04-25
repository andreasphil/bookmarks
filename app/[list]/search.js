"use client";

import { useDebouncedState } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import styles from "./search.module.css";

export default function Search() {
  // Dialog state
  const [visible, setVisible] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(visible);
  const dialogRef = useRef(null);

  // Search state
  const [immediateQuery, query, setQuery] = useDebouncedState(200, "");
  const [focusedResult, setFocusedResult] = useState(0);

  const { data, isLoading } = useSWR(
    ["/api/search", query],
    ([url, query]) =>
      fetch(`${url}?query=${query}`).then((response) => response.json()),
    { keepPreviousData: true }
  );

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
    const onSearchHotkey = (event) => {
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
  const onSearch = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLInputElement) {
      setQuery(event.currentTarget.value);
    }
  };

  // Resets the focused result when the results list changes
  useEffect(() => setFocusedResult(0), [data]);

  // Manages hotkeys for navigating and opening search results
  useEffect(() => {
    if (!visible) return;

    const onFocusMoved = (event) => {
      let handled = false;
      if (event.key === "ArrowUp") {
        setFocusedResult((state) => Math.max(0, state - 1));
        handled = true;
      } else if (event.key === "ArrowDown") {
        setFocusedResult((state) => Math.min(data.length - 1, state + 1));
        handled = true;
      } else if (event.key === "Enter") {
        if (!data[focusedResult].url) return;
        window.open(
          data[focusedResult].url,
          event.metaKey ? "_blank" : "_self"
        );
      }

      if (handled) event.preventDefault();
    };

    addEventListener("keydown", onFocusMoved);
    return () => removeEventListener("keydown", onFocusMoved);
  }, [visible, focusedResult, data]);

  // Results list or empty state if the query didn't lead to any results
  let resultsEl = null;
  if (data && data.length > 0) {
    resultsEl = (
      <ul className={styles.results}>
        {data.map((bookmark, i) => (
          <li className={styles.result} key={bookmark.url}>
            <a
              href={bookmark.url}
              onFocus={() => setFocusedResult(i)}
              className={`${styles.resultLink} ${
                i === focusedResult ? styles.focus : ""
              }`}
            >
              <span className={styles.icon}>{bookmark.icon}</span>
              <small className={styles.text}>
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
      <div className={styles.empty} data-trim="both">
        <h3>😵‍💫</h3>
        <p className="text-c-variant">Sorry, couldn&rsquo;t find anything.</p>
      </div>
    );
  }

  return (
    <>
      <button
        className={styles.searchToggleButton}
        data-variant="muted"
        onClick={() => setVisible(true)}
        title="Search"
      >
        🔎
      </button>
      <dialog className={styles.dialog} onClose={onDialogClose} ref={dialogRef}>
        <div className={styles.searchBoxWrapper}>
          <input
            className={styles.searchBox}
            onInput={onSearch}
            placeholder="Search for ..."
            value={immediateQuery}
          />
          {isLoading ? (
            <div className={styles.searchBoxSpinner} aria-busy={true} />
          ) : undefined}
        </div>
        {resultsEl}
      </dialog>
    </>
  );
}
