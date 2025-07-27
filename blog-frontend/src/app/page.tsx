import { getBlogPage } from "@/services/blogpage.service";
import { getBlogposts } from "@/services/blogposts.service";
import HeroSection from "@/components/blogui/HeroSection";
import { Metadata } from "next";
import { PostRenderer } from "@/components/blogui/blogrentrie-renderer";
import FavBlogs from "@/components/blogui/favposts";
import { NewBlogs } from "@/components/blogui/newest-posts";

export async function generateMetadata(): Promise<Metadata> {
  const pageMetaData = await getBlogPage()
  return {
    title: pageMetaData.seotitle,
    description: pageMetaData.seodescription,
  }
}

export default async function Home() {
  const blogpage = await getBlogPage();
  const blogposts = (await getBlogposts()).data;

  return (
    <div>
      <HeroSection title={blogpage.title} description={blogpage.description} />
      <FavBlogs favBlogs={blogpage.favblogs} />
      <NewBlogs posts={blogposts} />
    </div>
  );
}
