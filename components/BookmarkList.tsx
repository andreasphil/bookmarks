/** @jsx h */
import clsx from "clsx";
import { IS_BROWSER } from "fresh/runtime.ts";
import { Fragment, h } from "preact";
import { useCallback } from "preact/hooks";
import { HeartIcon } from "../components/Icons.tsx";
import type { Bookmark, Bookmarks } from "../utils/lib.ts";

function BookmarkListItem(
  props: Bookmark & {
    isFavorite: boolean;
    onToggleFavorite: (value: boolean) => void;
  }
) {
  const onFavoriteClick = (event: MouseEvent) => {
    event.preventDefault();
    props.onToggleFavorite(!props.isFavorite);
  };

  return (
    <li className="bookmarks__item">
      <a
        className={clsx("bookmarks__link", { favorite: props.isFavorite })}
        href={props.url}
        title={props.title}
      >
        <span className="bookmarks__icon">
          {props.icon}
          <button
            className={clsx("bookmarks__favorite", {
              "bookmarks__favorite--active": props.isFavorite,
            })}
            data-variant="ghost"
            onClick={onFavoriteClick}
            title={`Mark ${props.title} as favorite`}
            disabled={!IS_BROWSER}
          >
            <HeartIcon />
          </button>
        </span>
        <strong className="bookmarks__title">{props.title}</strong>
        {props.description ? (
          <small className="text-c-variant">{props.description}</small>
        ) : null}
      </a>
    </li>
  );
}

export default function BookmarkList(
  props: Bookmarks["groups"][0] & {
    isFavorite: (url: string) => boolean;
    onToggleFavorite: (item: Bookmark, value: boolean) => void;
  }
) {
  const onToggleFavorite = useCallback(
    (item: Bookmark, value: boolean) => {
      props.onToggleFavorite(item, value);
    },
    [props.onToggleFavorite]
  );

  return (
    <Fragment>
      {props.title ? (
        <h2 className="bookmarks__group-title">{props.title}</h2>
      ) : null}
      <ul className="bookmarks">
        {props.items.map((item) => (
          <BookmarkListItem
            isFavorite={props.isFavorite(item.url)}
            onToggleFavorite={(v) => onToggleFavorite(item, v)}
            {...item}
          />
        ))}
      </ul>
    </Fragment>
  );
}
