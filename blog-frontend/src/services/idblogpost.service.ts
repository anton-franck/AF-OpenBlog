"use server";

import {
  populateImageFields,
  processStrapiMediaUrls,
  STRAPI_API_KEY,
  STRAPI_URL,
} from "@/lib/strapi-helpers";
import { unstable_cache } from "next/cache";
import qs from "qs";

export interface BlogPost {
  data: {
    id: number;
    title: string;
    documentId: string;
    blogimage: StrapiImage;
    slug: string;
    seotitle: string;
    seodescription: string;
    updatedAt: string;
  };
}

interface StrapiImage {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}

export const getBlogpostById = async (id: string): Promise<BlogPost> => {
  return unstable_cache(
    async (): Promise<BlogPost> => {
      try {
        const query = qs.stringify({
          populate: {
            fields: "*",
            blogimage: {
              fields: populateImageFields,
            },
            labels: {
              populate: {
                fields: "*",
              },
            },
          },
        });

        const response = await fetch(
          `${STRAPI_URL}/api/blogentries/${id}?${query}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${STRAPI_API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch blog post ${id}: ${response.status}`
          );
        }

        const responseData = await response.json();
        const blogpost = responseData as BlogPost;
        return processStrapiMediaUrls(blogpost);
      } catch (error) {
        console.error(`Error fetching blog post with ID ${id}:`, error);
        throw error;
      }
    },
    [`blog-post-${id}`],
    {
      revalidate: 60,
    }
  )();
};
