import { useCallback, useEffect, useReducer } from "preact/hooks";

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

export type Bookmarks = {
  id: string;
  title: string;
  groups: {
    title?: string;
    items: Bookmark[];
  }[];
};

export type BookmarksMeta = Omit<Bookmarks, "groups">;

export type FavoritesList = Record<string, Bookmark>;

export type FavoritesDispatch =
  | { type: "add"; payload: Bookmark }
  | { type: "remove"; payload: string };

/* -------------------------------------------------- *
 * CONFIGURATION & CONSTANTS                          *
 * -------------------------------------------------- */

export const BOOKMARKS: BookmarksMeta[] = [
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

export function getPageTitle(title?: string) {
  return title ? `${title} | ${META.title}` : META.title;
}

/* -------------------------------------------------- *
 * FAVORITES                                          *
 * -------------------------------------------------- */

function readFavorites(): Record<string, Bookmark> {
  let favorites: Record<string, Bookmark> = {};
  const stored = localStorage.getItem("favorites");
  if (stored) {
    try {
      favorites = JSON.parse(stored);
    } catch {
      // Return the empty list
    }
  }
  return favorites;
}

function reduceFavorites(state: FavoritesList, action: FavoritesDispatch) {
  const next = { ...state };
  if (action.type === "add") {
    next[action.payload.url] = { ...action.payload };
  } else if (action.type === "remove") {
    delete next[action.payload];
  }
  return next;
}

/** Hooks for reading and writing favorite bookmarks to/from localStorage */
export function useFavorites() {
  const [favorites, updateFavorites] = useReducer<
    FavoritesList,
    FavoritesDispatch,
    FavoritesList
  >(reduceFavorites, {}, readFavorites);

  const isFavorite = useCallback(
    (url: string): boolean => !!favorites[url],
    [favorites]
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, updateFavorites, isFavorite };
}

/**
 * Returns a hook that implements the same interface as the favorites hook
 * above, but doesn't actually to anything, to it's safe to run in SSR
 * contexts.
 */
export function useNoopFavorites(): ReturnType<typeof useFavorites> {
  return {
    favorites: {},
    isFavorite: () => false,
    updateFavorites: () => undefined,
  };
}
