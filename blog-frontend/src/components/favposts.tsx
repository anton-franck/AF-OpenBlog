import { HeartIcon, BookmarkIcon } from "lucide-react"
import { FavPostCard } from "./favpost-card"

interface Post {
    id: number
    title: string
    slug: string
    description: string
    blogimage?: { url: string }
    updatedAt: string
}
interface FeaturedProps {
    favBlogs: Post[]
}

export default function FavBlogs({ favBlogs }: FeaturedProps) {
    return (
        <section className="py-6 lg:py-8 bg-gradient-to-br from-background to-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mb-6 lg:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                            <HeartIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Vorgeschlagene Beiträge
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {favBlogs.map((post) => (
                        <FavPostCard
                            post={post}
                            key={post.id}
                        />
                    ))}
                </div>

                {favBlogs.length === 0 && (
                    <div className="text-center py-12">
                        <BookmarkIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-muted-foreground mb-2">Keine Favoriten gefunden</h3>
                        <p className="text-muted-foreground">Fügen Sie Ihre ersten Lieblingsbeiträge hinzu.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
