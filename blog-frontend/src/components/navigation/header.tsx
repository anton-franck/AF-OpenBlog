import Image from "next/image";
import { NavMenu } from "./navmenu";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
    settings: {
        name: string;
        fromothersite: boolean;
        othersitelink: string;
        icon: {
            url: string;
        };
    };
    navlinks: NavLinks[];
}

interface NavLinks {
    name: string;
    link: string;
}



export const Header: React.FC<HeaderProps> = ({ settings, navlinks }) => {
    return (
        < header className="border-b px-3 sm:px-5">
            <div className="grid grid-cols-2 py-3 sm:py-4 items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-4 col-span-1">
                    {settings.fromothersite && (
                        <div className="lg:flex items-center gap-2 hidden">
                            <ArrowLeft className="w-4" />
                            <Link className="font-bold text-sm" href={settings.othersitelink || "/"} >Zurück zur Seite</Link>
                        </div>
                    )}

                    <Link href="/" className="flex items-center gap-2">
                        {settings.icon && (
                            <Image
                                src={settings.icon?.url || "/placeholder.svg"}
                                alt={`${settings.name} Logo`}
                                width={30}
                                height={30}
                                className="h-6 w-6 sm:h-8 sm:w-8"
                            />
                        )}
                        <p className="text-base sm:text-lg lg:text-xl font-bold truncate">{settings.name}</p>
                    </Link>
                </div>

                <div className="col-span-1 flex justify-end">
                    <NavMenu navlinks={navlinks} back={settings} />
                </div>

                {/* Mobile Menu Button */}

            </div>
        </header >
    )
}