import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { getBlogpageSettings } from "@/services/blogsettings.service";

export async function generateMetadata(): Promise<Metadata> {
  const pageMetaData = await getBlogpageSettings()
  return {
    title: pageMetaData.defaultseotitle,
    description: pageMetaData.defaultseodescription,
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
        <Header blogpage={settings} navlinks={settings.NavLinks} />
        {children}
        <Footer icon={settings.icon.url} name={settings.name} />
      </body>
    </html>
  );
}

