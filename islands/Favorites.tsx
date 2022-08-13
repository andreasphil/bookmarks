/** @jsx h */
import { IS_BROWSER } from "fresh/runtime.ts";
import { h } from "preact";
import BookmarkList from "../components/BookmarkList.tsx";
import type { Bookmark } from "../utils/lib.ts";
import { useFavorites, useNoopFavorites } from "../utils/lib.ts";

export default function FavoritesIsland() {
  const { favorites, updateFavorites } = IS_BROWSER
    ? useFavorites()
    : useNoopFavorites();

  const onToggleFavorite = (item: Bookmark, value: boolean) => {
    if (value) updateFavorites({ type: "add", payload: item });
    else updateFavorites({ type: "remove", payload: item.url });
  };

  return (
    <main data-fine-container data-fine-trim="both">
      {Object.keys(favorites).length === 0 ? (
        <ul className="bookmarks bookmarks--with-placeholders">
          {Array(6)
            .fill(undefined)
            .map((_, i) => (
              <li key={i} data-fine-transition />
            ))}{" "}
        </ul>
      ) : (
        <BookmarkList
          onToggleFavorite={onToggleFavorite}
          isFavorite={() => true}
          items={Object.values(favorites)}
        />
      )}
    </main>
  );
}
