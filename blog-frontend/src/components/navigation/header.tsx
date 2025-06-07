import Link from "next/link"
import Image from "next/image";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { NavMenu } from "./navmenu";

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
                <div className="flex items-center gap-2">
                    <Image
                        src={blogpage.icon.url || "/placeholder.svg"}
                        alt={`${blogpage.title} Logo`}
                        width={30}
                        height={30}
                        className="h-8 w-8 sm:h-8 sm:w-8"
                    />
                    <h1 className="text-lg sm:text-xl font-bold truncate">{blogpage.title}</h1>
                </div>

                <NavMenu />

                {/* Mobile Menu Button */}

            </div>
        </header >
    )
}