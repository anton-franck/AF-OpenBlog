import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { RichtextBanner as RichtextBannerType } from "@/services/blogpostbyslug.service";
import "./module.css"; // Assuming you have a CSS module for styles

interface RichTextBannerProps {
    content: RichtextBannerType;
}


export const RichTextBanner: React.FC<RichTextBannerProps> = ({ content }: RichTextBannerProps) => {


    return (
        <div className="py-4 px-0 sm:px-4 max-lg:mx-auto">
            {content.title && (
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">{content.title}</h3>
            )}
            <div className="richtextbanner prose prose-sm sm:prose lg:prose-lg max-w-none">
                <BlocksRenderer content={content.text} />
            </div>
        </div>
    );
}