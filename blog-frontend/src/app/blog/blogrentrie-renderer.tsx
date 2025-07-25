"use client";

import { BlogCard } from "@/components/blog-card";
import { BlogPosts as BlogPostListType } from "@/services/blogposts.service";
import { BlogLabels as BlogLabelListType } from "@/services/labels.service";

interface BlogEntryRendererProps {
    blogPosts: BlogPostListType;
    blogLabels: BlogLabelListType;
}

export const BlogEntryRenderer: React.FC<BlogEntryRendererProps> = ({ blogPosts, blogLabels }) => {
    return (
        <section className="py-8 sm:py-12 lg:py-16 flex justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">Alle Beiträge</h2>
                </div>
                <div className="flex gap-2 items-center mb-6 mt-8">
                    {blogLabels.data.map((label) => (
                        <span key={label.id} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                            {label.title}
                            <span className="text-gray-500"> ({label.blogentries.length})</span>
                        </span>
                    ))}
                </div>
                <PostRenderer posts={blogPosts.data} />
            </div>
        </section >
    );
};

interface Post { id: number; title: string; description: string; blogimage?: { url: string }; updatedAt: string; slug: string; }

interface AllProps { posts: Post[]; }

const PostRenderer = ({ posts }: AllProps) => {
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
            {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>

    );
}