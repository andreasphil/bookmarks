import { BOOKMARKS, Layout, type Bookmarks } from "$/utils/lib.tsx";
import type { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { join } from "std/path/mod.ts";

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

export default function ListBookmarks(props: PageProps<Bookmarks | null>) {
  return (
    <Layout title={props.data?.title} url={props.url.pathname}>
      {props.data?.groups ? (
        <main data-container data-trim="both">
          {props.data.groups.map((group) => (
            <>
              {group.title ? (
                <h2 className="bookmarks__group-title">{group.title}</h2>
              ) : null}

              <ul className="bookmarks">
                {group.items.map((item) => (
                  <li className="bookmarks__item">
                    <a
                      className="bookmarks__link"
                      href={item.url}
                      title={item.title}
                    >
                      <span className="bookmarks__icon">{item.icon}</span>
                      <strong className="bookmarks__title">{item.title}</strong>
                      {item.description ? (
                        <small className="text-c-variant">
                          {item.description}
                        </small>
                      ) : undefined}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ))}
        </main>
      ) : null}
    </Layout>
  );
}
