interface HeadlineProps {
    title: string;
    size: string;
    className?: string;
}

export const Headline: React.FC<HeadlineProps> = ({ title, size, className }) => {
    switch (size) {
        case "h1":
            return <h1 className={`text-2xl sm:text-3xl lg:text-4xl ${className ?? ""}`}>{title}</h1>;
        case "h2":
            return <h2 className={`text-xl sm:text-2xl lg:text-3xl ${className ?? ""}`}>{title}</h2>;
        case "h3":
            return <h3 className={`text-lg sm:text-xl lg:text-2xl ${className ?? ""}`}>{title}</h3>;
        case "h4":
            return <h4 className={`text-base sm:text-lg lg:text-xl ${className ?? ""}`}>{title}</h4>;
        case "h5":
            return <h5 className={`text-sm sm:text-base lg:text-lg ${className ?? ""}`}>{title}</h5>;
        case "h6":
            return <h6 className={`text-xs sm:text-sm lg:text-base ${className ?? ""}`}>{title}</h6>;
    }
};