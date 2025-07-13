import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { getBlogpageSettings } from "@/services/blogsettings.service";
import { processStrapiMediaUrls } from "@/lib/strapi-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const pageMetaData = await getBlogpageSettings()
  const processedMetaData = processStrapiMediaUrls(pageMetaData)
  console.log(pageMetaData.favicon)
  return {
    title: processedMetaData.defaultseotitle,
    description: processedMetaData.defaultseodescription,
    icons:
      pageMetaData.favicon
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getBlogpageSettings();

  return (
    <html lang="en">
      <body>
        <Header settings={settings} navlinks={settings.NavLinks} />
        {children}
        <Footer icon={settings.icon?.url} name={settings.name} />
      </body>
    </html>
  );
}

