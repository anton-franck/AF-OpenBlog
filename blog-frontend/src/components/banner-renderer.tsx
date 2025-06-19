import type React from "react"
import { Component } from "@/services/blogpostbyslug.service"


interface BannerRendererProps {
    component: Component
}

export const BannerRenderer: React.FC<BannerRendererProps> = ({ component }) => {
    switch (component.__component) {
        case "components.richtext":
            return <p>Text</p>
        // banner={component} />


        default:
            return (
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-yellow-700">Unknown component type: {component.__component}</p>
                </div>
            )
    }
}
