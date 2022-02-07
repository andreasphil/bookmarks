import { readdirSync, readFileSync, writeFileSync } from "fs";
import createSearch, { fullWordSplit } from "js-inverted-index";
import { resolve } from "path";

/** Shorthand for getting absolute file paths */
function path(filename) {
  const dirname = new URL("..", import.meta.url).pathname;
  return resolve(dirname, "public/data", filename);
}

/**
 * Custom tokenizer for the search index that returns not just the full word
 * but also all substrings of the word that would return true when used with
 * String.startsWith (e.g. dog -> d, do, dog).
 */
function tokenizer(input) {
  const tokens = new Set();
  fullWordSplit(input)
    .filter((word) => word.length > 0)
    .forEach((word) => {
      for (let i = 1; i <= word.length; i++) {
        tokens.add(word.substring(0, i));
      }
    });
  return Array.from(tokens);
}

// Read bookmarks stores in JSON files, ignore the ones starting with an
// underscore (so we can keep other JSONs in the same folder if we want to).
const files = readdirSync(path(".")).filter((f) => f.match(/^[^_].+\.json$/));
const bookmarks = files
  .reduce((all, current) => {
    const text = readFileSync(path(current), { encoding: "utf-8" });
    const obj = JSON.parse(text);
    all.push(...obj.flatMap((list) => list.items));
    return all;
  }, [])
  // The app uses URLs as IDs but for the search we'll use the index to reduce
  // the file size of the dump we're sending to the client
  .map((item, i) => ({ ...item, id: i }));

// Create the search index, serialize the results and the original documents
// and put them in the data folder where the app can fetch them from.
const { add, dump } = createSearch({
  fields: ["title", "url", "description", "tags"],
  tokenizer,
});
add(bookmarks);

writeFileSync(path("_search.json"), JSON.stringify(dump()), {
  encoding: "utf-8",
});

writeFileSync(path("_all.json"), JSON.stringify(bookmarks), {
  encoding: "utf-8",
});
