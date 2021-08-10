export type Bookmark = Readonly<{
  title: string;
  url: string;
  description?: string;
  icon?: string;
  tags?: Readonly<string[]>;
}>;

export type BookmarkCollection = Readonly<{
  title: string;
  items?: Bookmark[];
  description?: string;
  collections?: Omit<BookmarkCollection, "bookmarks">[];
  icon?: string;
}>;
