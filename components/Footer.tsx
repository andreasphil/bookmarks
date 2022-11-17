import { META } from "../utils/lib.ts";

export default function Footer() {
  return (
    <footer data-container className="footer">
      <small>
        A thing made by <a href={META.authorWebsite}>{META.authorName}</a>.{" "}
        🐱 <a href={META.repository}>View source</a>.
      </small>
    </footer>
  );
}
