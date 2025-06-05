import { getBlogPage } from "@/services/blogdata.service";
import { getBlogposts } from "@/services/blogpost.service";
import HeroSection from "@/components/HeroSection";
import AllPosts from "@/components/posts";
import Footer from "@/components/navigation/footer";
import { Header } from "@/components/navigation/header";
import FavBlogs from "@/components/favposts";

export default async function Home() {
  const blogpage = await getBlogPage();
  const blogposts = (await getBlogposts()).data;

  return (
    <div className="min-h-screen bg-background">
      <Header blogpage={blogpage} />
      <HeroSection title={blogpage.title} description={blogpage.description} />
      <FavBlogs favBlogs={blogpage.favblogs} />
      <AllPosts posts={blogposts} />
      <Footer icon={blogpage.icon.url} title={blogpage.title} />
    </div>
  );
}
