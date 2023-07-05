import bookmarksLists from "@/data/_lists.json";
import Fuse from "fuse.js";

/**
 * @typedef Bookmark
 * @prop {string} title
 * @prop {string} url
 * @prop {string} [description]
 * @prop {string} icon
 * @prop {string[]} [tags]
 */

/**
 * @typedef Bookmarks
 * @property {string} id
 * @property {string} title
 * @property {number} order
 * @property {Array<{ title?: string; items: Bookmark[] }>} groups
 */

/** @typedef {Record<string, { order: number; title: string }>} BookmarksMeta */

/** @returns {BookmarksMeta} */
export function getBookmarkLists() {
  return bookmarksLists;
}

/**
 * @param {string} id
 * @returns {Promise<Bookmarks>}
 */
export async function readBookmarkList(id) {
  const meta = getBookmarkLists()[id];
  if (!meta) throw new Error();

  // Need to manually map the ID to the import of the correct file since
  // dynamic imports break during build with template literals. Should rework
  // this at some point.
  /** @type {Bookmarks["groups"]} */
  let groups = [];
  switch (id) {
    case "design":
      groups = (await import("@/data/design.json")).default;
      break;
    case "development":
      groups = (await import("@/data/development.json")).default;
      break;
    case "learning":
      groups = (await import("@/data/learning.json")).default;
      break;
    case "other":
      groups = (await import("@/data/other.json")).default;
      break;
  }

  return { ...meta, id, groups };
}

/**
 * @param {string} query
 * @returns {Promise<Bookmark[]>}
 */
export async function searchBookmarks(query) {
  if (!query) return [];

  const imports = Object.keys(getBookmarkLists()).map((id) =>
    readBookmarkList(id)
  );

  const allBookmarks = (await Promise.all(imports))
    .flatMap((list) => list.groups)
    .flatMap((group) => group.items);

  const fuse = new Fuse(allBookmarks, {
    keys: ["title", "url", "description", "tags"],
    minMatchCharLength: Math.min(query.length, 3),
  });

  return fuse.search(query).map((result) => result.item);
}
