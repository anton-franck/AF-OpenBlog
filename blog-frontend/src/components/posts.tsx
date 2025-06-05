import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface Post { id: number; title: string; description: string; blogimage?: { url: string }; updatedAt: string; }

interface AllProps { posts: Post[]; }

export default function AllPosts({ posts }: AllProps) {
    return (
        <section className="py-8 sm:py-12 lg:py-16">
            <div className="container px-4">
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
                        <Link href={`/blog/${post.id}`} key={post.id} >
                            <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                                <div className="relative h-48 w-full">
                                    {post.blogimage && (
                                        <Image src={post.blogimage.url} alt={post.title} fill className="object-cover" />
                                    )}
                                    <div className="w-full h-full bg-muted-foreground/10 flex items-center justify-center">
                                        <span className="text-muted-foreground text-sm">Bild</span>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between mt-auto">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-1 h-4 w-4" />
                                        {new Date(post.updatedAt).toLocaleDateString("de-DE")}
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}