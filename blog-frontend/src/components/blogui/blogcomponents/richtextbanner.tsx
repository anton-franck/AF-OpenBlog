import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { RichtextBanner as RichtextBannerType } from "@/services/blogpostbyslug.service";
import "./module.css";
import { Headline } from "../../ui/headline";

interface RichTextBannerProps {
    content: RichtextBannerType;
}


export const RichTextBanner: React.FC<RichTextBannerProps> = ({ content }: RichTextBannerProps) => {


    return (
        <div className="py-4 px-0 sm:px-4 max-lg:mx-auto">
            {content.title && (
                <Headline
                    title={content.title}
                    size={content.titlesize ?? "h2"}
                    className="font-bold mb-4 sm:mb-6 lg:mb-8" />
            )}
            <div className="richtextbanner prose prose-sm sm:prose lg:prose-lg max-w-none">
                <BlocksRenderer content={content.text} />
            </div>
        </div>
    );
}

