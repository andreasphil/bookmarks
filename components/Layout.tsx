import Header from "$/islands/Header.tsx";
import { getPageTitle, META } from "$/utils/lib.ts";
import { Head } from "$fresh/runtime.ts";
import type { RenderableProps } from "preact";

export default function Layout(
  props: RenderableProps<{
    title?: string;
    url: string;
  }>
) {
  return (
    <>
      <Head>
        <title>{getPageTitle(props.title)}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="hsl(155 80% 38%)" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <Header title={props.title ?? ""} url={props.url}></Header>
      {props.children}
      <Footer />
    </>
  );
}
