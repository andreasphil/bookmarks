import { useState } from "preact/hooks";
import { Accordion } from "../components/accordion";
import { BookmarkList } from "../components/bookmarks";
import { bookmarks } from "../data/bookmarks";

export default function Home() {
  const firstGroup = bookmarks[0]?.title;
  const [currentPane, setCurrentPane] = useState<string>(firstGroup);

  return (
    <div className="p-8 h-screen bg-gray-50">
      <Accordion
        className="h-full"
        currentPane={currentPane}
        onPaneChange={(next) => setCurrentPane(next)}
      >
        {bookmarks.map((group) => (
          <div title={group.title} id={group.title} icon={group.icon}>
            <BookmarkList {...group} />
          </div>
        ))}
      </Accordion>
    </div>
  );
}
