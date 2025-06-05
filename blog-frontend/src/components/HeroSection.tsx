import React from "react";

interface HeroProps {
    title: string;
    description: string;
}

export default function HeroSection({ title, description }: HeroProps) {
    return (
        <section className="bg-muted py-8 sm:py-12 lg:py-16">
            <div className="container text-center px-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                    {description}
                </p>
            </div>
        </section>
    );
}