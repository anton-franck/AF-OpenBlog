"use server";

import {
  populateImageFields,
  processStrapiMediaUrls,
  STRAPI_API_KEY,
  STRAPI_URL,
} from "@/lib/strapi-helpers";
import { unstable_cache } from "next/cache";
import qs from "qs";

export interface BlogPosts {
  data: {
    id: number;
    title: string;
    description: string;
    documentId: string;
    blogimage: StrapiImage;
    slug: string;
    updatedAt: string;
    label?: BlogLabel[];
  }[];
}

interface StrapiImage {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}

interface BlogLabel {
  id: number;
  title: string;
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

export const getBlogposts = async (): Promise<BlogPosts> => {
  return unstable_cache(
    async (): Promise<BlogPosts> => {
      try {
        const query = qs.stringify({
          populate: {
            fields: "*",
            blogimage: {
              fields: populateImageFields,
            },
            label: {
              populate: {
                fields: "*",
              },
            },
          },
        });

        const response = await fetch(`${STRAPI_URL}/api/blogentries?${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog page: ${response.status}`);
        }

        const responseData = await response.json();
        const blogposts = responseData as BlogPosts;
        return processStrapiMediaUrls(blogposts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }
    },
    ["blog-posts"],
    {
      revalidate: 60,
    }
  )();
};
