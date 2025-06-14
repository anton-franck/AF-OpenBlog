import Image from "next/image";
import { NavMenu } from "./navmenu";
import Link from "next/link";

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
        < header className="border-b flex justify-center max-lg:px-5">
            <div className="container flex items-center justify-between py-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={blogpage.icon.url || "/placeholder.svg"}
                        alt={`${blogpage.title} Logo`}
                        width={30}
                        height={30}
                        className="h-8 w-8 sm:h-8 sm:w-8"
                    />
                    <p className="text-lg sm:text-xl font-bold truncate">{blogpage.title}</p>
                </Link>

                <NavMenu />

                {/* Mobile Menu Button */}

            </div>
        </header >
    )
}