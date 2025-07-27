"use client";

import { BlogCard } from "@/components/blogui/blog-card";
import { BlogPosts as BlogPostListType } from "@/services/blogposts.service";
import { BlogLabels as BlogLabelListType } from "@/services/labels.service";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlogEntryRendererProps {
    blogPosts: BlogPostListType;
    blogLabels: BlogLabelListType;
}


export const BlogEntryRenderer: React.FC<BlogEntryRendererProps> = ({ blogPosts, blogLabels }) => {
    const [selectedLabelId, setSelectedLabelId] = useState<number | null>(null);

    const filteredPosts = selectedLabelId
        ? blogPosts.data.filter(post => {
            const label = blogLabels.data.find(l => l.id === selectedLabelId);
            return label?.blogentries.some((entry: any) => entry.id === post.id);
        })
        : blogPosts.data;

    return (
        <section className="py-8 sm:py-12 lg:py-16 flex justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">Alle Beiträge</h2>
                </div>
                <div className="flex gap-2 items-center my-6">
                    {blogLabels.data.map((label) => (
                        <button
                            key={label.id}
                            className={cn(
                                "px-3 py-1 rounded-full cursor-pointer transition-colors",
                                selectedLabelId === label.id ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-800"
                            )}
                            onClick={() => setSelectedLabelId(selectedLabelId === label.id ? null : label.id)}
                        >
                            {label.title}
                        </button>
                    ))}
                </div>
                <PostRenderer posts={filteredPosts} />
            </div>
        </section >
    );
};

interface Post { id: number; title: string; description: string; blogimage?: { url: string }; updatedAt: string; slug: string; }

interface AllProps { posts: Post[]; }

export const PostRenderer = ({ posts }: AllProps) => {
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
            {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>

    );
}