import type { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    return new Response(null, {
      status: 302,
      headers: { Location: "/development" },
    });
  },
};
