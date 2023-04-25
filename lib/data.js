import Fuse from "fuse.js";

/**
 * @typedef Bookmark
 * @prop {string} title
 * @prop {string} url
 * @prop {string | undefined} description
 * @prop {string} icon
 * @prop {string[] | undefined} tags
 */

/**
 * @typedef Bookmarks
 * @property {string} id
 * @property {string} title
 * @property {number} order
 * @property {Array<{ title?: string; items: Bookmark[] }>} groups
 */

/** @typedef {Record<string, { order: number; title: string }>} BookmarksMeta */

/** @type {BookmarksMeta} */
const BOOKMARKS_LISTS = {
  development: { order: 1, title: "Development" },
  design: { order: 2, title: "Design" },
  learning: { order: 3, title: "Learning" },
  other: { order: 4, title: "Other" },
};

/** @returns {BookmarksMeta} */
export function getBookmarkLists() {
  return BOOKMARKS_LISTS;
}

/**
 * @param {string} id
 * @returns {Promise<Bookmarks>}
 */
export async function readBookmarkList(id) {
  const meta = BOOKMARKS_LISTS[id];
  if (!meta) throw new Error();

  const { default: bookmarks } = await import(`@/data/${id}.json`);
  return { ...meta, id, groups: bookmarks };
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
