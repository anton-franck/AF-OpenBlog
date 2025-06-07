import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { Menu, MenuIcon, X } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"


export const NavMenu = async () => {


    return (
        <div>
            <div className="hidden lg:block ">
                <div className="flex gap-4">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/Blog"}>Blog</Link>
                    <Link href={"/"}>Custom</Link>
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

                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div >

    )
}