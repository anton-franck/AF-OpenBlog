import { ImageBanner as ImageBannerType } from "@/services/blogpostbyslug.service";
import Image from "next/image";

interface ImageBannerProps {
    banner: ImageBannerType;
}

export const ImageBanner: React.FC<ImageBannerProps> = ({ banner }: ImageBannerProps) => {
    return (
        <div className="m-4">
            <Image
                src={banner.image.url}
                alt={banner.title ?? banner.image.name}
                width={banner.image.width}
                height={banner.image.height}
                className="max-w-2xl object-cover max-h-[600px]"
            />
            <p className="py-2 ">{banner.title}</p>
        </div>
    );
};