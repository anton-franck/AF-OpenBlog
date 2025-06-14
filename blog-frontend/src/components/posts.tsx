import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BlogCard } from "./blog-card";


interface Post { id: number; title: string; description: string; blogimage?: { url: string }; updatedAt: string; slug: string; }

interface AllProps { posts: Post[]; }

export default function AllPosts({ posts }: AllProps) {
    return (
        <section className="py-8 sm:py-12 lg:py-16 flex justify-center">
            <div className="container">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">Alle Beiträge</h2>
                    <Link href="/blog">
                        <Button variant="outline" className="w-full sm:w-auto">
                            Mehr anzeigen
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}