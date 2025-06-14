import { getBlogPage } from "@/services/blogpage.service";
import { getBlogposts } from "@/services/blogposts.service";
import HeroSection from "@/components/HeroSection";
import AllPosts from "@/components/posts";
import FavBlogs from "@/components/favposts";
import { Metadata } from "next";

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
    <div className="">
      <HeroSection title={blogpage.title} description={blogpage.description} />
      <FavBlogs favBlogs={blogpage.favblogs} />
      <AllPosts posts={blogposts} />
    </div>
  );
}
