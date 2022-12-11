import BookmarkList from "$/components/BookmarkList.tsx";
import {
  useFavorites,
  useNoopFavorites,
  type Bookmark,
  type Bookmarks,
} from "$/utils/lib.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Bookmarks(props: { groups: Bookmarks["groups"] }) {
  const { isFavorite, updateFavorites } = IS_BROWSER
    ? useFavorites()
    : useNoopFavorites();

  const onToggleFavorite = (item: Bookmark, value: boolean) => {
    if (value) updateFavorites({ type: "add", payload: item });
    else updateFavorites({ type: "remove", payload: item.url });
  };

  return (
    <main data-container data-trim="both">
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
