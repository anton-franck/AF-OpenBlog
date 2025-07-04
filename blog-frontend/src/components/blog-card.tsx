import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon, BookmarkIcon, CalendarIcon } from "lucide-react";

interface BlogCardProps {
    post: {
        id: number;
        title: string;
        slug: string;
        description: string;
        blogimage?: { url: string };
        updatedAt: string;
    };
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
            <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md bg-card/50 backdrop-blur-sm pt-0 pb-2">
                <div className="relative aspect-[3/2] overflow-hidden">
                    {post.blogimage ? (
                        <Image
                            src={post.blogimage.url || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                            <div className="text-center">
                                <BookmarkIcon className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                                <span className="text-muted-foreground text-sm font-medium">Kein Bild</span>
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="flex flex-col flex-1 p-3">
                    <CardHeader className="p-0 mb-1">
                        <CardTitle className="text-base lg:text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-200">
                            {post.title}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 flex-1">
                        <p className="text-muted-foreground line-clamp-1 text-sm leading-relaxed">{post.description}</p>
                    </CardContent>

                    <CardFooter className="p-0 mt-2 pt-2 border-t border-border/50">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center text-xs lg:text-sm text-muted-foreground">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {new Date(post.updatedAt).toLocaleDateString("de-DE", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </div>

                            <div className="flex items-center text-xs lg:text-sm text-primary font-medium  transition-all duration-200">
                                <span>Lesen</span>
                                <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-200" />
                            </div>
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
};