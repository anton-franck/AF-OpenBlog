import { HeroBanner as HeroBannerType } from "@/services/blogpostbyslug.service";
import Image from "next/image";
interface HeroBannerProps {
    banner: HeroBannerType;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ banner }: HeroBannerProps) => {
    return (
        <div className="py-4 px-0 sm:px-4">
            <div className="relative w-full max-w-4xl max-lg:mx-auto">
                {banner.image && (
                    <Image
                        src={banner.image.url}
                        alt={banner.title ?? banner.image.name}
                        width={banner.image.width}
                        height={banner.image.height}
                        className="w-full h-auto max-w-[700px] object-cover rounded-lg shadow-md max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
                    />
                )}
                <div className="absolute inset-0 flex items-end justify-start p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white drop-shadow-lg bg-black/40 px-3 py-2 sm:px-4 sm:py-2 rounded">
                        {banner.title}
                    </h1>
                </div>
            </div>
        </div>
    );
}