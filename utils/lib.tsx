import Header from "$/islands/header.tsx";
import { Head } from "$fresh/runtime.ts";
import { RenderableProps } from "preact";

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

/* -------------------------------------------------- *
 * CONFIGURATION & CONSTANTS                          *
 * -------------------------------------------------- */

export const BOOKMARKS: BookmarksMeta[] = [
  { id: "development", title: "Development" },
  { id: "design", title: "Design" },
  { id: "learning", title: "Learning" },
  { id: "other", title: "Other" },
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
 * Components                                         *
 * -------------------------------------------------- */

export function Layout(
  props: RenderableProps<{
    title?: string;
    url: string;
  }>
) {
  return (
    <>
      <Head>
        <title>{getPageTitle(props.title)}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="hsl(155 80% 38%)" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <Header title={props.title ?? ""} url={props.url}></Header>

      {props.children}

      <footer data-container className="footer">
        <small>
          A thing made by <a href={META.authorWebsite}>{META.authorName}</a>. 🐱{" "}
          <a href={META.repository}>View source</a>.
        </small>
      </footer>
    </>
  );
}
