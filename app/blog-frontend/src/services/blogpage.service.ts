"use server";

import {
  populateImageFields,
  processStrapiMediaUrls,
  STRAPI_API_KEY,
  STRAPI_URL,
} from "@/lib/strapi-helpers";
import { unstable_cache } from "next/cache";
import qs from "qs";

export interface BlogPage {
  id: number;
  title: string;
  description: string;
  seotitle: string;
  seodescription: string;
  favblogs: {
    id: number;
    title: string;
    description: string;
    image: StrapiImage;
    url: string;
    slug: string;
    blogimage: StrapiImage;

    updatedAt: string;
  }[];
}

interface StrapiImage {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}

// export type Component =
//   | ImageHero
//   | BenefitsBanner
//   | InfoBanner
//   | NewsBanner
//   | CalendarBanner
//   | TextImageBanner;

// export interface LandingPage {
//   id: number;
//   documentId: string;
//   title: string;
//   meta_title: string;
//   meta_description: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

export const getBlogPage = async (): Promise<BlogPage> => {
  return unstable_cache(
    async (): Promise<BlogPage> => {
      try {
        const query = qs.stringify({
          populate: {
            fields: "*",
            favblogs: {
              fields: "*",
              populate: {
                blogimage: {
                  fields: populateImageFields,
                },
              },
            },
          },
        });

        // For a Single Type, we don't need an ID in the URL
        const response = await fetch(`${STRAPI_URL}/api/Blogpage?${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog page: ${response.status}`);
        }

        const responseData = await response.json();
        const blogpage = responseData.data as BlogPage;
        return processStrapiMediaUrls(blogpage);
      } catch (error) {
        console.error("Error fetching blog page:", error);
        throw error;
      }
    },
    ["blog-page"],
    {
      revalidate: 60, // Revalidate every minute
    }
  )();
};
