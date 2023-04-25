import { searchBookmarks } from "@/lib/data";

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const result = await searchBookmarks(query);

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}
