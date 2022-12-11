import type { Bookmark, Bookmarks } from "$/utils/lib.tsx";
import type { Handlers } from "$fresh/server.ts";
import createSearch from "js-inverted-index/index.ts";
import { startsWith } from "js-inverted-index/utils.ts";
import { join } from "std/path/mod.ts";

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
      tokenizer: startsWith,
    });
    add(all);

    const result = JSON.stringify({ documents: all, index: dump() });

    return new Response(result, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
