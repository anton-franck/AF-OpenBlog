import { getBlogPage } from "@/services/blogdata.service";
import { getBlogposts } from "@/services/blogposts.service";
import AllPosts from "@/components/posts";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const pageMetaData = await getBlogPage()
    return {
        title: pageMetaData.title + " - Blogs",
        description: "Blog posts and articles on various topics",
    }
}

export default async function Home() {
    const blogposts = (await getBlogposts()).data;

    return (
        <div className="">
            <AllPosts posts={blogposts} />
        </div>
    );
}
