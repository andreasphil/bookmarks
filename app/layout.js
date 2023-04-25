import { META } from "@/lib/config";
import "./globals.css";
import styles from "./layout.module.css";

/** @type {import("next").Metadata} */
export const metadata = {
  title: META.title,
  themeColor: "hsl(199 93% 47%)",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <footer data-container className={styles.footer}>
          <small>
            A thing made by <a href={META.authorWebsite}>{META.authorName}</a>.
            🐱 <a href={META.repository}>View source</a>.
          </small>
        </footer>
      </body>
    </html>
  );
}
