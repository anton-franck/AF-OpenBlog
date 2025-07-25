import type React from "react"
import { Component } from "@/services/blogpostbyslug.service"
import { RichTextBanner } from "./richtextbanner"
import { ImageBanner } from "./imagebanner"
import { Border } from "../border"
import { HeroBanner } from "./herobanner"
import { ButtonComponent } from "./buttonbanner"
import { AccordionBanner } from "./accordionbanner"


interface BannerRendererProps {
    component: Component
}

export const BannerRenderer: React.FC<BannerRendererProps> = ({ component }) => {
    switch (component.__component) {
        case "components.richtext":
            return <RichTextBanner content={component} />
        case "components.imagebanner":
            return <ImageBanner banner={component} />
        case "components.border":
            return <Border />
        case "components.herobanner":
            return <HeroBanner banner={component} />
        case "components.button":
            return <ButtonComponent banner={component} />
        case "components.accordion":
            return <AccordionBanner banner={component} />

        default:
            return (
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-yellow-700">Unknown component type: {component[component]}</p>
                </div>
            )
    }
}
