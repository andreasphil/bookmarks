import Layout from "$/components/Layout.tsx";
import Favorites from "$/islands/Favorites.tsx";
import type { PageProps } from "$fresh/server.ts";

export default function Home(props: PageProps) {
  return (
    <Layout title="Favorites" url={props.url.pathname}>
      <FavoritesIsland />
    </Layout>
  );
}
