/** @jsx h */
import { IS_BROWSER } from "fresh/runtime.ts";
import { h } from "preact";
import BookmarkList from "../components/BookmarkList.tsx";
import type { Bookmark, Bookmarks } from "../utils/lib.ts";
import { useFavorites, useNoopFavorites } from "../utils/lib.ts";

export default function Bookmarks(props: { groups: Bookmarks["groups"] }) {
  const { isFavorite, updateFavorites } = IS_BROWSER
    ? useFavorites()
    : useNoopFavorites();

  const onToggleFavorite = (item: Bookmark, value: boolean) => {
    if (value) updateFavorites({ type: "add", payload: item });
    else updateFavorites({ type: "remove", payload: item.url });
  };

  return (
    <main data-fine-container data-fine-trim="both">
      {props.groups.map((group) => (
        <BookmarkList
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          {...group}
        />
      ))}
    </main>
  );
}
