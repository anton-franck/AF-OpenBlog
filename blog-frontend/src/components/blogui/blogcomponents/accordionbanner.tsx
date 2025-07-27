import { AccordionBanner as AccordionBannerType } from "@/services/blogpostbyslug.service";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import "./module.css";

interface AccordionBannerProps {
    banner: AccordionBannerType;
}

export const AccordionBanner: React.FC<AccordionBannerProps> = ({ banner }) => {
    return (
        <div className="my-8 px-0 sm:px-4">
            {banner.title && (
                <h2 className="text-2xl font-bold mb-3 text-gray-800">{banner.title}</h2>
            )}
            {banner.subtitle && (
                <p className="text-gray-600 mb-6 text-lg">{banner.subtitle}</p>
            )}
            <Accordion type="single" collapsible className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {banner.AccordionContent.map((item, index) => (
                    <AccordionItem key={index} value={`item-${item.id}`} className="border-b border-gray-100 last:border-b-0">
                        <AccordionTrigger className="cursor-pointer px-6 py-4 hover:bg-gray-50 transition-colors duration-200 text-left font-medium text-gray-900">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 bg-gray-50/50">
                            {item.image && (
                                <div className="max-w-[500px] mb-4">
                                    <Image
                                        src={item.image.url}
                                        alt={item.title + " image"}
                                        width={500}
                                        height={300}
                                        className="w-full h-auto object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                            <div className="richtextbanner prose prose-sm max-w-none">
                                <BlocksRenderer content={item.content} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};