/** @jsx h */
import { IS_BROWSER } from "fresh/runtime.ts";
import type { RenderableProps } from "preact";
import { h } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { HeartIcon, SearchIcon } from "../components/Icons.tsx";
import SearchDialog from "../components/SearchDialog.tsx";
import { BOOKMARKS, META } from "../utils/lib.ts";

function HeaderNav({ children }: RenderableProps<unknown>) {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
}

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
        f-active={props.isActive ? true : null}
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
    <header f-container>
      {IS_BROWSER ? (
        <SearchDialog visible={searchVisible} onSetVisible={setSearchVisible} />
      ) : null}
      <small>
        <strong className="text-c-variant">{META.title}</strong>
      </small>
      <h1 className="page-title">{title}</h1>
      <HeaderNav>
        <li>
          <button
            f-ghost
            onClick={() => setSearchVisible(true)}
            disabled={!IS_BROWSER}
            title="Search"
          >
            <SearchIcon />
          </button>
        </li>
        <li className="header__divider" f-transition></li>
        <HeaderNavItem
          to="/"
          title="Favorites"
          color="favorite"
          isActive={"/" === url}
        >
          <HeartIcon />
        </HeaderNavItem>
        {BOOKMARKS.map((list) => (
          <HeaderNavItem
            to={`/${list.id}`}
            isActive={`/${list.id}` === url}
            label={list.title}
            title={list.title}
          />
        ))}
      </HeaderNav>
    </header>
  );
}
