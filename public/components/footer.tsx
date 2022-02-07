/* -------------------------------------------------- *
 * FOOTER                                             *
 * -------------------------------------------------- */

import { FunctionComponent } from "preact";
import { META } from "../lib";
import { GitHubIcon } from "./icons";

export const Footer: FunctionComponent = () => (
  <footer f-container>
    <small>
      A thing made by <a href={META.authorWebsite}>{META.authorName}.</a>
    </small>
    <a href={META.repository} title="Source code on GitHub">
      <GitHubIcon />
    </a>
  </footer>
);
