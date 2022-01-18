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

/* -------------------------------------------------- *
 * DATA LOADING                                       *
 * -------------------------------------------------- */

export async function getBookmarksList(id: string): Promise<BookmarkList> {
  const list = BOOKMARKS.find((i) => i.id === id);

  if (!list) {
    throw new Error();
  }

  const groupsModule = await import(`./data/${id}.json`);

  return {
    ...list,
    groups: groupsModule.default,
  };
}
