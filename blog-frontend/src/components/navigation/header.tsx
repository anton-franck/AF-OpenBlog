import Link from "next/link"
import Image from "next/image";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

interface HeaderProps {
    blogpage: {
        title: string;
        icon: {
            url: string;
        };
    };
}

export const Header: React.FC<HeaderProps> = ({ blogpage }) => {
    return (
        < header className="border-b" >
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
        </header >
    )
}