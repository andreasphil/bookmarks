import { FunctionComponent } from "preact";
import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { BookmarkList, BOOKMARKS, getBookmarksList } from "./lib";

/* -------------------------------------------------- *
 * LAYOUTS                                            *
 * -------------------------------------------------- */

export const BaseLayout = (Component: FunctionComponent): FunctionComponent => {
  return () => (
    <>
      <HeaderNav>
        <HeaderNavItem to="/" label="Home" />
        {BOOKMARKS.map((list) => (
          <HeaderNavItem to={`/${list.id}`} label={list.title} />
        ))}
        <HeaderNavItem
          to="https://github.com/andreasphil/bookmarks"
          label="GitHub"
        />
      </HeaderNav>
      <div>
        <Component />
      </div>
    </>
  );
};

/* -------------------------------------------------- *
 * HEADER                                             *
 * -------------------------------------------------- */

export const HeaderNav: FunctionComponent = ({ children }) => {
  return (
    <header>
      <h1>Andreas&rsquo; Bookmarks</h1>
      <nav>
        <ul>{children}</ul>
      </nav>
    </header>
  );
};

type HeaderNavItemProps = { to: string; label: string };
export const HeaderNavItem: FunctionComponent<HeaderNavItemProps> = ({
  to,
  label,
}) => {
  const route = useRoute();
  const isActive = route.path === to;

  return (
    <li>
      <a href={to}>{label}</a>
    </li>
  );
};

export const HeaderNavSpacer: FunctionComponent = () => {
  return (
    <li>
      <div></div>
    </li>
  );
};

/* -------------------------------------------------- *
 * BOOKMARKS                                          *
 * -------------------------------------------------- */

/* -------------------------------------------------- *
 * PAGES                                              *
 * -------------------------------------------------- */

export const Bookmarks: FunctionComponent = BaseLayout(() => {
  const route = useRoute();
  const id = route.params.listId;

  const [items, setItems] = useState<BookmarkList>();
  useEffect(() => {
    getBookmarksList(id).then((result) => {
      setItems(result);
    });
  }, [id]);

  return (
    <main>
      {items?.title ? <h2>{items.title}</h2> : undefined}
      {items?.groups
        ? items.groups.map((group) => (
            <section>
              {group.title ? <h3>{group.title}</h3> : undefined}
              <ul>
                {group.items.map((item) => (
                  <li>
                    <span>{item.icon}</span>
                    <a href={item.url} title={item.title}>
                      <strong>{item.title}</strong>
                      {item.description ? ` – ${item.description}` : undefined}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))
        : undefined}
    </main>
  );
});

export const Home: FunctionComponent = BaseLayout(() => {
  return <main></main>;
});

export const NotFound: FunctionComponent = BaseLayout(() => (
  <section>
    <h1>404: Not Found</h1>
    <p>It's gone :(</p>
  </section>
));
