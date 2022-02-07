/* -------------------------------------------------- *
 * PAGES                                              *
 * -------------------------------------------------- */

import { FunctionComponent } from "preact";
import { useRoute } from "preact-iso";
import { Bookmark, useBookmarks, useFavorites } from "../lib";
import { BookmarkGroup } from "./bookmarks";
import { Footer } from "./footer";
import { Header } from "./header";

export const Bookmarks: FunctionComponent = () => {
  const route = useRoute();
  const id = route.params.listId;
  const items = useBookmarks(id);

  const { isFavorite, updateFavorites } = useFavorites();
  const onToggleFavorite = (item: Bookmark, value: boolean) => {
    if (value) updateFavorites({ type: "add", payload: item });
    else updateFavorites({ type: "remove", payload: item.url });
  };

  return (
    <>
      <Header title={items?.title} />
      <main f-container f-trim="both">
        {items?.groups
          ? items.groups.map((group) => (
              <BookmarkGroup
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite}
                {...group}
              />
            ))
          : null}
      </main>
      <Footer />
    </>
  );
};

export const Home: FunctionComponent = () => {
  const { favorites, updateFavorites } = useFavorites();
  const onToggleFavorite = (item: Bookmark, value: boolean) => {
    if (value) updateFavorites({ type: "add", payload: item });
    else updateFavorites({ type: "remove", payload: item.url });
  };

  return (
    <>
      <Header title="Favorites" />
      <main f-container f-trim="both">
        {Object.keys(favorites).length === 0 ? (
          <ul className="bookmarks bookmarks--with-placeholders">
            {Array(6)
              .fill(undefined)
              .map((_, i) => (
                <li key={i} f-transition />
              ))}{" "}
          </ul>
        ) : (
          <BookmarkGroup
            onToggleFavorite={onToggleFavorite}
            isFavorite={() => true}
            items={Object.values(favorites)}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export const NotFound: FunctionComponent = () => (
  <section>
    <h1>404: Not Found</h1>
    <p>It’s gone :(</p>
  </section>
);
