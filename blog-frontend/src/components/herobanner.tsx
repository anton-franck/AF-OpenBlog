import { HeroBanner as HeroBannerType } from "@/services/blogpostbyslug.service";

interface HeroBannerProps {
    banner: HeroBannerType;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ banner }: HeroBannerProps) => {
    return (
        <div className="m-4 relative max-w-2xl">
            {banner.image && (
                <img
                    src={banner.image.url}
                    alt={banner.title ?? banner.image.name}
                    width={banner.image.width}
                    height={banner.image.height}
                    className="object-cover max-h-[600px] w-full h-auto"
                />
            )}
            <div className="absolute inset-0 flex items-end justify-start ">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg bg-black/40 px-4 py-2 rounded">
                    {banner.title}
                </h1>
            </div>
        </div>
    );
}