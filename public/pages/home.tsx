import { useRoute } from "preact-iso";
import { useState } from "preact/hooks";
import { Accordion } from "../components/accordion";
import { BookmarkList } from "../components/bookmarks";
import { bookmarks } from "../data/bookmarks";

export default function Home() {
  // Get the initial collection from the route, use the first in the list as a
  // fallback
  const route = useRoute();

  const initial = bookmarks.find(
    (collection) => collection.title === route.query.c
  )
    ? route.query.c
    : bookmarks[0]?.title;

  // Currently visible collection
  const [current, setCurrent] = useState<string>(initial);

  // Update the current collection as well as the router state
  const setCurrentAndNavigate = (next: string) => {
    setCurrent(next);
    history.pushState(null, "", `?c=${encodeURIComponent(next)}`);
  };

  return (
    <div className="h-full">
      <Accordion
        className="h-full"
        currentPane={current}
        onPaneChange={setCurrentAndNavigate}
      >
        {bookmarks.map((collection) => (
          <div
            title={collection.title}
            id={collection.title}
            icon={collection.icon}
          >
            <BookmarkList {...collection} />
          </div>
        ))}
      </Accordion>
    </div>
  );
}
