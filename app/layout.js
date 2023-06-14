import "./globals.css";
import ThemeColor from "./themeColor";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Andreas’ Bookmarks",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <ThemeColor />
      </body>
    </html>
  );
}
