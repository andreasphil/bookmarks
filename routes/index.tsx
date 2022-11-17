import type { PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import FavoritesIsland from "../islands/Favorites.tsx";

export default function Home(props: PageProps) {
  return (
    <Layout title="Favorites" url={props.url.pathname}>
      <FavoritesIsland />
    </Layout>
  );
}
