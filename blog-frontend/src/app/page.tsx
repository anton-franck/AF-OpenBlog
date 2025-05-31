import { getBlogPage } from "@/services/blogdata.service";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, HeartIcon, ClockIcon, BookmarkIcon, MenuIcon } from "lucide-react"
import { getBlogposts } from "@/services/blogpost.service";


export default async function Home() {
  const blogpage = await getBlogPage();
  const blogposts = (await getBlogposts()).data;
  return (
    <div className="min-h-screen bg-background">
      {/* Header mit Logo und Name */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image
              src={blogpage.icon.url || "/placeholder.svg"}
              alt={`${blogpage.title} Logo`}
              width={40}
              height={40}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <h1 className="text-lg sm:text-2xl font-bold truncate">{blogpage.title}</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="font-medium hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-medium hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-medium hover:underline">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-medium hover:underline">
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero mit Beschreibung */}
      <section className="bg-muted py-8 sm:py-12 lg:py-16">
        <div className="container text-center px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{blogpage.title}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {blogpage.description}
          </p>
        </div>
      </section>

      {/* Favorisierte Blogbeiträge */}
      <section className="py-8 sm:py-12 lg:py-16 bg-muted">
        <div className="container px-4">
          <div className="flex items-center mb-6 sm:mb-8">
            <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold">Vorgeschlagene Beiträge</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {blogpage.favblogs.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col lg:flex-row h-full">
                <div className="relative w-full lg:w-1/3 h-48 lg:h-auto min-h-[200px]">
                  {post.blogimage && (
                    <Image
                      src={post.blogimage?.url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
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
                    <p className="text-muted-foreground line-clamp-3 text-sm sm:text-base">{post.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-between mt-auto gap-2 sm:gap-0">
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
                <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                  <span className="sr-only">Zum Artikel</span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alle Blogbeiträge */}
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
            {blogposts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full">
                  {post.blogimage && (
                    <Image src={post.blogimage?.url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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
                <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                  <span className="sr-only">Zum Artikel</span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={blogpage.icon.url || "/placeholder.svg"}
              alt={`${blogpage.title} Logo`}
              width={30}
              height={30}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
            <span className="font-medium text-sm sm:text-base">{blogpage.title}</span>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground text-center">
            {new Date().getFullYear()} {blogpage.title}. Made with OpenBlog.
          </div>
        </div>
      </footer>
    </div>
  );
}
