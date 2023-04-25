"use client";

import { META } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import styles from "./header.module.css";
import Search from "./search";

export default function Header({ title, navItems, activeId }) {
  const { push } = useRouter();

  // Add navigation hotkeys to switch between lists by pressing number keys
  const onNavigationHotkey = useCallback((event) => {
    if (event.target instanceof HTMLInputElement || event.metaKey) return;

    let handled = false;
    if (event.key.match(/^[0-9]$/)) {
      const i = Number.parseInt(event.key) - 1;
      if (i === -1) {
        push("/");
        handled = true;
      } else if (i < navItems.length) {
        push(`/${navItems[i].id}`);
        handled = true;
      }
    }

    if (handled) event.preventDefault();
  }, []);

  useEffect(() => {
    addEventListener("keydown", onNavigationHotkey);
    return () => removeEventListener("keydown", onNavigationHotkey);
  }, []);

  return (
    <header data-container data-trim="top" className={styles.header}>
      <hgroup>
        <p>{META.title}</p>
        <h1>{title}</h1>
      </hgroup>
      <nav>
        <ul>
          <li>
            <Search />
          </li>
          {/* All other collections */}
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                data-active={item.id === activeId}
                href={`/${item.id}`}
                title={item.title}
                children={item.title}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
