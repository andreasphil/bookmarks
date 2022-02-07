import { useCallback, useEffect, useReducer, useState } from "preact/hooks";

/* -------------------------------------------------- *
 * TYPES                                              *
 * -------------------------------------------------- */

export type Bookmark = {
  title: string;
  url: string;
  description?: string;
  icon: string;
  tags?: Readonly<string[]>;
};

export type BookmarkList = {
  id: string;
  title: string;
  groups: {
    title?: string;
    items: Bookmark[];
  }[];
};

export type BookmarkListMeta = Omit<BookmarkList, "groups">;

export type FavoritesList = Record<string, Bookmark>;

export type FavoritesDispatch =
  | { type: "add"; payload: Bookmark }
  | { type: "remove"; payload: string };

/* -------------------------------------------------- *
 * CONFIGURATION & CONSTANTS                          *
 * -------------------------------------------------- */

export const BOOKMARKS: BookmarkListMeta[] = [
  {
    id: "development",
    title: "Development",
  },
  {
    id: "design",
    title: "Design",
  },
  {
    id: "learning",
    title: "Learning",
  },
  {
    id: "other",
    title: "Other",
  },
];

export const META = {
  title: "Andreas’ Bookmarks",
  authorName: "Andreas Philippi",
  authorWebsite: "https://andreasphil.com",
  repository: "https://github.com/andreasphil/bookmarks",
} as const;

/* -------------------------------------------------- *
 * DATA LOADING                                       *
 * -------------------------------------------------- */

// See https://github.com/preactjs/wmr/issues/305 and
// https://github.com/preactjs/wmr/blob/main/packages/preact-iso/lazy.js

// Simple cache for keeping lists we've already fetched in memory. The cache
// holds the promises returned when fetching the data, as well as the result
// or error when the promise resolved.
type CacheEntry = Promise<BookmarkList> & { value?: BookmarkList; error?: any };
const cache = new Map<string, CacheEntry>();

const fetchBookmarkGroups = async (
  id: string
): Promise<BookmarkList["groups"]> => {
  return fetch(`/data/${id}.json`).then((r) => r.json());
};

export function useBookmarks(id: string): BookmarkList {
  // Simple state to tell the component to re-render once data fetching
  // has completed
  const [, update] = useState(0);

  const list = BOOKMARKS.find((i) => i.id === id);
  if (!list) {
    throw new Error();
  }

  let result = cache.get(id);
  if (!result) {
    result = fetchBookmarkGroups(id).then((groups) => ({ ...list, groups }));
    cache.set(id, result);
    result
      .then((value) => {
        result.value = value;
        update(1);
      })
      .catch((e) => {
        result.error = e;
        update(1);
      });
  }

  // Return the results or error values if the promise has already resolved.
  // Otherwise, throw the promise for suspense/prerender to catch it and wait
  // for the result before continuing, see:
  // https://github.com/preactjs/wmr/tree/main/packages/preact-iso#prerenderjs
  if (result.value) return result.value;
  else if (result.error) throw result.error;
  else throw result;
}

/* -------------------------------------------------- *
 * FAVORITES                                          *
 * -------------------------------------------------- */

const readFavorites = (): Record<string, Bookmark> => {
  let favorites: Record<string, Bookmark> = {};
  const stored = localStorage.getItem("favorites");
  if (stored) {
    try {
      favorites = JSON.parse(stored);
    } catch {}
  }
  return favorites;
};

const reduceFavorites = (state: FavoritesList, action: FavoritesDispatch) => {
  const next = { ...state };
  if (action.type === "add") {
    next[action.payload.url] = { ...action.payload };
  } else if (action.type === "remove") {
    delete next[action.payload];
  }
  return next;
};

export function useFavorites() {
  const [favorites, updateFavorites] = useReducer<
    FavoritesList,
    FavoritesDispatch,
    FavoritesList
  >(reduceFavorites, {}, readFavorites);

  const isFavorite = useCallback(
    (url: string) => {
      return !!favorites[url];
    },
    [favorites]
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, updateFavorites, isFavorite };
}
