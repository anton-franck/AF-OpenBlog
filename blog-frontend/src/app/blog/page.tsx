import { getBlogPage } from "@/services/blogpage.service";
import { getBlogposts } from "@/services/blogposts.service";
import { Metadata } from "next";
import { getBlogLabels } from "@/services/labels.service";
import { BlogEntryRenderer } from "../../components/blogui/blogrentrie-renderer";

export async function generateMetadata(): Promise<Metadata> {
    const pageMetaData = await getBlogPage()
    return {
        title: pageMetaData.title + " - Blogs",
        description: pageMetaData.title + " | Alle Blogeinträge",
    }
}

export default async function Home() {
    const blogposts = (await getBlogposts());
    const labels = (await getBlogLabels());

    return (
        <div className="">
            <BlogEntryRenderer blogPosts={blogposts} blogLabels={labels} />
        </div>
    );
}
