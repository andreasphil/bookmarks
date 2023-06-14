import { getBookmarkLists, readBookmarkList } from "@/lib/data";
import Header from "./header";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const lists = getBookmarkLists();
  return Object.keys(lists).map((list) => ({ list }));
}

export default async function List({ params }) {
  const data = await readBookmarkList(params.list);
  const lists = getBookmarkLists();

  const navItems = Object.entries(lists).map(([id, item]) => ({
    id,
    title: item.title,
  }));

  return data.groups ? (
    <>
      <Header title={data.title} activeId={params.list} navItems={navItems} />

      <main>
        {data.groups.map((group) => (
          <section key={group.title} className={styles.group} data-trim="both">
            {/* Group headline (if one exists) */}
            {group.title ? (
              <h2 className={styles.groupTitle}>{group.title}</h2>
            ) : undefined}

            {/* Bookmarks inside the group */}
            <ul className={styles.bookmarks}>
              {group.items.map((item) => (
                <li key={item.url} className={styles.item}>
                  <a className={styles.link} href={item.url} title={item.title}>
                    <span className={styles.icon}>{item.icon}</span>
                    <strong className={styles.title}>{item.title}</strong>

                    {item.description ? (
                      <small className="text-c-variant">
                        {item.description}
                      </small>
                    ) : undefined}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  ) : undefined;
}
