import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

interface BlogCardProps {
    post: {
        id: number;
        title: string;
        description: string;
        blogimage?: { url: string };
        updatedAt: string;
    };
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link href={`/blog/${post.id}`}>
            <Card className="overflow-hidden flex flex-col h-full">
                {post.blogimage ? (
                    <div className="relative h-48 w-full">
                        <Image
                            src={post.blogimage.url}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="h-48 w-full bg-muted-foreground/10 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Bild</span>
                    </div>
                )}
                <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title} {post.id}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                        {post.description}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between mt-auto">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {new Date(post.updatedAt).toLocaleDateString("de-DE")}
                    </div>
                </CardFooter>

            </Card>
        </Link>
    );
};