/* -------------------------------------------------- *
 * BOOKMARKS                                          *
 * -------------------------------------------------- */

import clsx from "clsx";
import { FunctionComponent } from "preact";
import { useCallback } from "preact/hooks";
import { Bookmark, BookmarkList } from "../lib";
import { HeartIcon } from "./icons";

type BookmarkGroupItemProps = Bookmark & {
  isFavorite: boolean;
  onToggleFavorite: (value: boolean) => void;
};
export const BookmarkGroupItem: FunctionComponent<BookmarkGroupItemProps> = (
  props
) => {
  const onFavoriteClick = (event: MouseEvent) => {
    event.preventDefault();
    props.onToggleFavorite(!props.isFavorite);
  };

  return (
    <li>
      <a
        className={clsx({ favorite: props.isFavorite })}
        f-transition
        href={props.url}
        title={props.title}
      >
        <span className="bookmarks__icon">
          {props.icon}
          <button
            className={clsx("bookmarks__favorite", {
              "bookmarks__favorite--active": props.isFavorite,
            })}
            f-ghost
            onClick={onFavoriteClick}
            title={`Mark ${props.title} as favorite`}
          >
            <HeartIcon />
          </button>
        </span>
        <strong className="bookmarks__title">{props.title}</strong>
        {props.description ? (
          <small class="text-c-variant">{props.description}</small>
        ) : null}
      </a>
    </li>
  );
};

type BookmarkGroupProps = BookmarkList["groups"][0] & {
  isFavorite: (url: string) => boolean;
  onToggleFavorite: (item: Bookmark, value: boolean) => void;
};
export const BookmarkGroup: FunctionComponent<BookmarkGroupProps> = (props) => {
  const onToggleFavorite = useCallback(
    (item: Bookmark, value: boolean) => {
      props.onToggleFavorite(item, value);
    },
    [props.onToggleFavorite]
  );

  return (
    <>
      {props.title ? (
        <h2 className="bookmark-group-title">{props.title}</h2>
      ) : null}
      <ul className="bookmarks">
        {props.items.map((item) => (
          <BookmarkGroupItem
            isFavorite={props.isFavorite(item.url)}
            onToggleFavorite={(v) => onToggleFavorite(item, v)}
            {...item}
          />
        ))}
      </ul>
    </>
  );
};
