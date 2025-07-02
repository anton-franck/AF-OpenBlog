import type React from "react"
import { Component } from "@/services/blogpostbyslug.service"
import { RichTextBanner } from "./richtextbanner"
import { ImageBanner } from "./imagebanner"
import { Border } from "./border"


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

        default:
            return (
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-yellow-700">Unknown component type: {component[component]}</p>
                </div>
            )
    }
}
