import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { ArrowLeft, MenuIcon, X } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
    navlinks: NavLinks[];
    back: Back;
}

interface NavLinks {
    name: string;
    link: string;
}

interface Back {
    fromothersite: boolean;
    othersitelink: string;
}

export const NavMenu: React.FC<HeaderProps> = ({ navlinks, back }) => {


    return (
        <div>
            <div className="hidden lg:block ">
                <div className="flex gap-4">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/blog"}>Blog</Link>
                    {navlinks.map((links, idx) => (
                        <Link href={links.link} key={idx}>{links.name}</Link>
                    ))}
                </div>
            </div>
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <div className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded p-[2px] ">
                            <MenuIcon className="h-5 w-5 cursor-pointer" />
                        </div>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="grid grid-cols-4 items-center ">
                                <div></div>
                                <p className="col-span-2 flex justify-center">Menu</p>

                                <SheetClose className="hover:text-gray-400 col-span-1 cursor-pointer flex justify-end focus:outline-hidden">
                                    <X size={"sm"} className="w-[15px] font-bold" />
                                </SheetClose>
                            </SheetTitle>
                            <div className="mx-auto flex flex-col gap-4 pt-6">
                                <Link href={"/"}>Home</Link>
                                <Link href={"/blog"}>Blog</Link>
                                {navlinks.map((links, idx) => (
                                    <Link href={links.link} key={idx}>{links.name}</Link>
                                ))}
                                {back.fromothersite && (
                                    <div className="lg:flex items-center gap-2 hidden">
                                        <ArrowLeft className="w-4" />
                                        <Link className="font-bold" href={back.othersitelink || "/"} >Zurück zur Seite</Link>
                                    </div>
                                )}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div >

    )
}