import { FunctionComponent } from "preact";
import { Bookmark, BookmarkCollection } from "../data/types";

const BookmarkListItem: FunctionComponent<Bookmark> = (props) => {
  return (
    <li className="list-none">
      <a
        className="group my-[-1px] ring-primary-500 block -mx-4 px-4 py-4 hover:bg-gray-100 normal:rounded outline-none transition-colors duration-100 focus:ring-2"
        href={props.url}
      >
        <span className="flex items-center">
          {props.icon ? (
            <span className="inline-flex items-center justify-center mr-2 p-1 w-8 h-8 bg-gray-100 rounded">
              {props.icon}
            </span>
          ) : (
            <img
              className="inline-block mr-2 p-1 w-8 h-8 bg-gray-100 rounded"
              src={`https://www.google.com/s2/favicons?sz=64&domain_url=${props.url}`}
            />
          )}

          <span className="group-hover:underline font-semibold leading-tight capitalize truncate">
            {props.title}
          </span>
        </span>
        {props.description && (
          <span className="block ml-10 text-gray-500 text-sm">
            {props.description}
          </span>
        )}
      </a>
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
        <h3 className="text-primary-500 mb-4 normal:mt-12 mt-8 text-sm font-bold leading-none uppercase">
          {title}
        </h3>
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
      {bookmarks?.length > 0 && (
        <ul className="divide-gray-100 divide-y">{bookmarks}</ul>
      )}
      {subSections?.length > 0 && <ul>{subSections}</ul>}
    </BookmarkSection>
  );
};
