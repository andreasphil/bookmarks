import type { Bookmark, Bookmarks } from "$/utils/lib.ts";
import type { Handlers } from "$fresh/server.ts";
import createSearch from "js-inverted-index/index.ts";
import { fullWordSplit } from "js-inverted-index/utils.ts";
import { join } from "std/path/mod.ts";
import type { Bookmark, Bookmarks } from "../../utils/lib.ts";

/**
 * Custom tokenizer for the search index that returns not just the full word
 * but also all substrings of the word that would return true when used with
 * String.startsWith (e.g. dog -> d, do, dog).
 */
function tokenizer(input: string) {
  const tokens = new Set<string>();
  fullWordSplit(input)
    .filter((word) => word.length > 0)
    .forEach((word) => {
      for (let i = 1; i <= word.length; i++) {
        tokens.add(word.substring(0, i));
      }
    });
  return Array.from(tokens);
}

// TODO: Cache this once the caching API is available
// See: https://github.com/denoland/fresh/issues/8
export const handler: Handlers = {
  async GET() {
    let all: Bookmark[] = [];
    const dataDir = join(Deno.cwd(), "data");

    // Read all bookmark files in the data folder and flatten them into one
    // long list since we don't care about the categories and groups for the
    // search index
    for await (const entry of Deno.readDir(dataDir)) {
      if (entry.isFile && entry.name.endsWith(".json")) {
        const text = await Deno.readTextFile(join(dataDir, entry.name));
        const obj: Bookmarks["groups"] = JSON.parse(text);
        all.push(...obj.flatMap((list) => list.items));
      }
    }

    // The app uses URLs as IDs but for the search we'll use the index to reduce
    // the file size of the dump we're sending to the client
    all = all.map((item, i) => ({ ...item, id: i }));

    // Create the search index, dump the result, and serialize it into a JSON for
    // the client together with the list of all bookmarks
    const { add, dump } = createSearch({
      fields: ["title", "url", "description", "tags"],
      tokenizer,
    });
    add(all);

    const result = JSON.stringify({ documents: all, index: dump() });

    return new Response(result, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
