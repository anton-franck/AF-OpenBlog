import { getBlogposts } from "@/services/blogposts.service";
import { getBlogpostBySlug } from "@/services/blogpostbyslug.service";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BannerRenderer } from "@/components/blogui/blogcomponents/banner-renderer";
import { BlogEntryBanner } from "@/components/blogui/blogcomponents/blogentriebanner";

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
  const blogPost = await getBlogpostBySlug(slug);

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

  const listedposts = await getBlogposts();

  const blog = await getBlogpostBySlug(slug);
  if (!blog) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 ">
        <Link
          href={"/"}
          className="flex items-center gap-2 w-fit text-sm sm:text-base hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <p>Zurück zur Blogpage</p>
        </Link>
        <p className="text-xs sm:text-sm sm:flex sm:justify-end text-muted-foreground">
          Aktualisiert: {new Date(blog.updatedAt).toLocaleDateString("de-DE")}
        </p>
      </div>
      <div className="px-3 sm:px-5 lg:px-8  max-lg:mx-auto">
        {blog.components.map((component, idx) => (
          <BannerRenderer component={component} key={idx} />
        ))}
        {blog.showentrybanner && (
          <BlogEntryBanner
            postid={blog.id}
            Blogposts={listedposts}
            selectedEntries={blog.blogentries}
          />
        )}
      </div>
    </div>
  );
}
