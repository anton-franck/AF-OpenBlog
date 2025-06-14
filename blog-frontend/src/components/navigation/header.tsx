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
        < header className="border-b px-5">
            <div className="grid grid-cols-2 py-4 items-center">
                <div className="flex items-center gap-4 col-span-1">
                    {settings.fromothersite && (
                        <div className="lg:flex items-center gap-2 hidden">
                            <ArrowLeft className="w-4" />
                            <Link className="font-bold" href={settings.othersitelink || "/"} >Zurück zur Seite</Link>
                        </div>
                    )}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={settings.icon.url || "/placeholder.svg"}
                            alt={`${settings.name} Logo`}
                            width={30}
                            height={30}
                            className="h-8 w-8 sm:h-8 sm:w-8"
                        />
                        <p className="text-lg sm:text-xl font-bold truncate">{settings.name}</p>
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