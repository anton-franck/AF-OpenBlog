import { ImageBanner as ImageBannerType } from "@/services/blogpostbyslug.service";
import Image from "next/image";

interface ImageBannerProps {
    banner: ImageBannerType;
}

export const ImageBanner: React.FC<ImageBannerProps> = ({ banner }: ImageBannerProps) => {
    return (
        <div className="py-4 px-0 sm:px-4">
            <div className="relative w-full max-w-4xl ">
                <Image
                    src={banner.image.url}
                    alt={banner.title ?? banner.image.name}
                    width={banner.image.width}
                    height={banner.image.height}
                    className="w-full h-auto object-cover rounded-lg shadow-md max-h-[400px] sm:max-h-[500px] lg:max-h-[600px]"
                />
            </div>
            {banner.title && (
                <p className="py-2 text-sm sm:text-base text-muted-foreground px-1">{banner.title}</p>
            )}
        </div>
    );
};