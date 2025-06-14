import { getBlogposts } from "@/services/blogposts.service";
import { getBlogpostBySlug } from "@/services/blogpostbyslug.service";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 1;

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
    const blogPosts = (await getBlogposts()).data;
    if (!blogPosts) {
        return [];
    }
    return blogPosts.map((post) => ({ slug: post.slug ?? "" }));
};

export async function generateMetadata(props: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
    const { slug } = await props.params;
    const blogPost = (await getBlogpostBySlug(slug));

    return {
        title: blogPost?.seotitle,
        description: blogPost?.seodescription,
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {

    const slug = (await params).slug;
    if (!slug) {
        return notFound();
    }

    const blog = await getBlogpostBySlug(slug);
    if (!blog) {
        return notFound();
    }


    return (
        <div>
            <div className="grid grid-cols-2">
                <Link href={"/"} className="flex items-center gap-2 p-2 w-fit"><ArrowLeft className="w-4" /> <p>Zurück zur Blogpage</p></Link>
                <p className="flex justify-end p-2">Aktuallisiert: {new Date(blog.updatedAt).toLocaleDateString("de-DE")}</p>
            </div>
            <div className="my-20 text-center">
                {blog.title}
                {blog.id}
            </div>
        </div>
    );
}
