/** @jsx h */
import { h } from "preact";
import { META } from "../utils/lib.ts";
import { GitHubIcon } from "./Icons.tsx";

export default function Footer() {
  return (
    <footer f-container>
      <small>
        A thing made by <a href={META.authorWebsite}>{META.authorName}.</a>
      </small>
      <a href={META.repository} title="Source code on GitHub">
        <GitHubIcon />
      </a>
    </footer>
  );
}
