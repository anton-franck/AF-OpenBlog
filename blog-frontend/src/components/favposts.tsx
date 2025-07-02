import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, CalendarIcon, BookmarkIcon } from "lucide-react";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    slug: string;
    description: string;
    blogimage?: { url: string };
    updatedAt: string;
}

interface FeaturedProps {
    favBlogs: Post[];
}

export default function FavBlogs({ favBlogs }: FeaturedProps) {
    return (
        <section className="pb-8 lg:pb-12 flex justify-center bg-muted">
            <div className="container px-4">
                <div className="flex items-center mb-6 sm:mb-8">
                    <HeartIcon className="h-5 w-5 mr-2 text-primary" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Vorgeschlagene Beiträge</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {favBlogs.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} >
                            <Card key={post.id} className="overflow-hidden flex flex-col lg:flex-row h-full max-w-[600px]">

                                <div className="relative w-full max-w-[250px] h-48 lg:h-auto min-h-[150px]">
                                    {post.blogimage && (
                                        <Image src={post.blogimage.url} alt={post.title} fill className="object-cover" />
                                    )}
                                    <div className="w-full h-full bg-muted-foreground/10 flex items-center justify-center">
                                        <span className="text-muted-foreground text-sm">Bild</span>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:w-2/3 p-4 lg:p-0">
                                    <CardHeader className="pb-2 lg:pb-6">
                                        <CardTitle className="line-clamp-2 text-lg sm:text-xl">{post.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-2 lg:pb-6">
                                        <p className="text-muted-foreground line-clamp-3 text-sm sm:text-base">
                                            {post.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex flex-col sm:flex-row justify-between mt-auto gap-2">
                                        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                            {new Date(post.updatedAt).toLocaleDateString("de-DE")}
                                        </div>
                                        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                                            <BookmarkIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                            Favorit
                                        </div>
                                    </CardFooter>
                                </div>

                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section >
    );
}