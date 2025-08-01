import React from "react";
import Image from "next/image";

interface FooterProps {
    icon: string;
    name: string;
}

export default function Footer({ icon, name }: FooterProps) {
    return (
        <footer className="border-t py-6 sm:py-8 flex justify-center">
            <div className="container flex flex-col md:flex-row justify-between items-center px-4 gap-4">
                <div className="flex items-center gap-2">
                    {icon && (
                        <Image src={icon} alt={`${name} Logo`} width={30} height={30} className="h-6 w-6 sm:h-8 sm:w-8" />
                    )}
                    <span className="font-medium text-sm sm:text-base">{name}</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground text-center">
                    {new Date().getFullYear()} {name}. Made with OpenBlog.
                </div>
            </div>
        </footer>
    );
}