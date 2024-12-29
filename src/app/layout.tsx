import type { Metadata } from "next";
import "./globals.css";
import sfui from "./sfui";

export const metadata: Metadata = {
  title: "PostEZ",
  description: "Made by team PostEZ <3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sfui.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
