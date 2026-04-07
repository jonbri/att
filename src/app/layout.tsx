import { ReactNode } from "react";
import { Ubuntu as Font } from "next/font/google";
import "@/global.scss";

const font = Font({ subsets: ["latin"], weight: "300" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>ATT</title>
        <meta name="og:title" content="ATT" />
        <meta name="description" content="ATT" />
      </head>
      <body className={font.className}>
        <div>
          <h1>
            <a href="./">ATT</a>
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
}
