import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenBlog",
  description: "OpenBlog - A Next.js Blog Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
