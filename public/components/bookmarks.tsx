import { FunctionComponent } from "preact";
import { Bookmark, BookmarkCollection } from "../data/types";

const BookmarkListItem: FunctionComponent<Bookmark> = (props) => {
  return (
    <li className="list-disc">
      <a href={props.url}>{props.title}</a>
    </li>
  );
};

// Wraps nested collections inside a list item with their own headline.
const BookmarkSection: FunctionComponent<{
  nested?: boolean;
  title: string;
}> = ({ nested, title, children }) => {
  if (nested) {
    return (
      <li className="list-none">
        <h3 className="my-4 text-2xl font-bold leading-none">{title}</h3>
        {children}
      </li>
    );
  } else {
    return <>{children}</>;
  }
};

export const BookmarkList: FunctionComponent<
  BookmarkCollection & { nested?: boolean }
> = (props) => {
  // Top level bookmarks in the current collection
  const bookmarks = props.items?.map((item) => <BookmarkListItem {...item} />);

  // Nested collections
  const subSections = props.collections?.map((collection) => (
    <BookmarkList {...collection} nested={true} />
  ));

  return (
    <BookmarkSection title={props.title} nested={props.nested}>
      {bookmarks?.length > 0 && <ul className="mt-4 pl-8">{bookmarks}</ul>}
      {subSections?.length > 0 && <ul>{subSections}</ul>}
    </BookmarkSection>
  );
};
