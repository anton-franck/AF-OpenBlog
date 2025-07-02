import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { RichtextBanner as RichtextBannerType } from "@/services/blogpostbyslug.service";
import "./module.css"; // Assuming you have a CSS module for styles

interface RichTextBannerProps {
    content: RichtextBannerType;
}


export const RichTextBanner: React.FC<RichTextBannerProps> = ({ content }: RichTextBannerProps) => {


    return (
        <div className="p-4">
            {content.title && (
                <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
            )}
            <div className={"richtextbanner"}>
                <BlocksRenderer content={content.text} />
            </div>
        </div>
    );
}