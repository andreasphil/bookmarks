/** @jsx h */
import type { Handlers } from "fresh/server.ts";
import { PageProps } from "fresh/server.ts";
import { h } from "preact";
import { join } from "std/path/mod.ts";
import Layout from "../components/Layout.tsx";
import BookmarksIsland from "../islands/Bookmarks.tsx";
import type { Bookmarks } from "../utils/lib.ts";
import { BOOKMARKS } from "../utils/lib.ts";

export const handler: Handlers<Bookmarks | null> = {
  async GET(_, context) {
    const { list } = context.params;
    const listMeta = BOOKMARKS.find((i) => i.id === list);
    let bookmarks: Bookmarks | null = null;

    if (!listMeta) throw new Error();

    const listFilePath = join(Deno.cwd(), "data", `${list}.json`);
    const groupsJson = await Deno.readTextFile(listFilePath);
    const groups = JSON.parse(groupsJson);
    bookmarks = { ...listMeta, groups };

    return context.render(bookmarks);
  },
};

export default function Page(props: PageProps<Bookmarks | null>) {
  return (
    <Layout title={props.data?.title} url={props.url.pathname}>
      {props.data?.groups ? (
        <BookmarksIsland groups={props.data.groups} />
      ) : null}
    </Layout>
  );
}
