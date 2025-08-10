import { CardsBanner as CardBannerType } from "@/services/blogpostbyslug.service";
import {
    Card as CardComponent,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface CardBannerProps {
    banner: CardBannerType;
}

export const CardBanner: React.FC<CardBannerProps> = ({ banner }) => {

    return (
        <div className="py-8 px-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{banner.title}</h2>
                <p className="text-gray-600 leading-relaxed">{banner.description}</p>
            </div>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 max-md:flex max-md:flex-col gap-3">
                {banner.Cards.map((card) => (
                    <Card card={card} key={card.id} />
                ))}
            </div>
        </div>
    );
}


interface Card {
    id: number;
    title: string;
    text: string;
    image: {
        url: string;
    };
    buttontitle: string;
    buttonlink: string;
}

const Card: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <CardComponent className="w-full max-w-[500px] md:max-w-[300px] py-4 max-md:mx-auto ">
            <CardHeader className="px-4">
                {card.image && (
                    <Image
                        src={card.image.url}
                        alt={card.title}
                        width={500}
                        height={300}
                        className="object-cover rounded-md"
                    />
                )}

            </CardHeader>
            <CardContent className={!card.image?.url ? "my-auto" : undefined}>
                <p className={`text-md font-bold${!card.image?.url ? " text-center" : ""}`}>{card.title}</p>
                <p className="">{card.text}</p>
            </CardContent>
            <CardFooter className="mt-auto">
                <Link href={card.buttonlink} className="w-full">
                    <Button className="cursor-pointer w-full">
                        {card.buttontitle}
                    </Button>
                </Link>
            </CardFooter>
        </CardComponent>
    )
}