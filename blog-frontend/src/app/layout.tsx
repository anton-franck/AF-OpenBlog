import type { Metadata } from "next";
import "./globals.css";
import { getBlogPage } from "@/services/blogpage.service";
import { Header } from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { getBlogpageSettings } from "@/services/blogsettings.service";

export const metadata: Metadata = {
  title: "OpenBlog",
  description: "OpenBlog - A Next.js Blog Template",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const blogpage = await getBlogPage();
  const settings = await getBlogpageSettings();

  return (
    <html lang="en">
      <body>
        <Header blogpage={blogpage} />
        {children}
        <Footer icon={blogpage.icon.url} title={blogpage.title} />
      </body>
    </html>
  );
}
