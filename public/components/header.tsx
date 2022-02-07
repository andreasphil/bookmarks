/* -------------------------------------------------- *
 * HEADER                                             *
 * -------------------------------------------------- */

import { FunctionComponent } from "preact";
import { useLocation, useRoute } from "preact-iso";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { BOOKMARKS, META } from "../lib";
import { HeartIcon, SearchIcon } from "./icons";
import { Search } from "./search";

export const HeaderNav: FunctionComponent = ({ children }) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
};

type HeaderNavItemProps = {
  to: string;
  label?: string;
  title: string;
  color?: string;
};
export const HeaderNavItem: FunctionComponent<HeaderNavItemProps> = (props) => {
  const route = useRoute();
  const isActive = route.path === props.to;

  return (
    <li>
      <a
        className={props.color ? `header__item--${props.color}` : null}
        f-active={isActive ? true : null}
        href={props.to}
        title={props.title}
      >
        {props.label ? props.label : null}
        {props.children}
      </a>
    </li>
  );
};

type HeaderProps = { title: string };
export const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const { route } = useLocation();

  const onNavigationHotkey = useCallback((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement || event.metaKey) return;

    let handled = false;
    if (event.key.match(/^[0-9]$/)) {
      const i = Number.parseInt(event.key) - 2;
      if (i === -1) {
        route("/");
        handled = true;
      } else if (i < BOOKMARKS.length) {
        route(`/${BOOKMARKS[i].id}`);
        handled = true;
      }
    }

    if (handled) event.preventDefault();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onNavigationHotkey);
    return () => window.removeEventListener("keydown", onNavigationHotkey);
  }, []);

  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <header f-container>
      <Search visible={searchVisible} onSetVisible={setSearchVisible} />
      <small>
        <strong className="text-c-variant">{META.title}</strong>
      </small>
      <h1 className="page-title">{title}</h1>
      <HeaderNav>
        <li>
          <button f-ghost onClick={() => setSearchVisible(true)}>
            <SearchIcon />
          </button>
        </li>
        <li className="header__divider" f-transition></li>
        <HeaderNavItem to="/" title="Favorites" color="favorite">
          <HeartIcon />
        </HeaderNavItem>
        {BOOKMARKS.map((list) => (
          <HeaderNavItem
            to={`/${list.id}`}
            label={list.title}
            title={list.title}
          />
        ))}
      </HeaderNav>
    </header>
  );
};
