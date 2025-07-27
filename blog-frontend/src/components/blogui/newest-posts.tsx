import Link from "next/link";
import { Button } from "../ui/button";
import { PostRenderer } from "./blogrentrie-renderer";

interface Post { id: number; title: string; description: string; blogimage?: { url: string }; updatedAt: string; slug: string; }

interface AllProps { posts: Post[]; }

export const NewBlogs = ({ posts }: AllProps) => {
    return (
        <section className="my-4 mb-8 flex justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:flex-row sm:items-center justify-between gap-4">
                    <h4 className="text-2xl sm:text-3xl font-bold my-4">Neuste Beiträge</h4>
                    <div className="flex justify-end"><Button className="cursor-pointer" >
                        <Link href="/blog">Alle anzeigen</Link></Button></div>
                </div>
                <PostRenderer posts={posts.slice(0, 6)} />
            </div>
        </section >
    )
}