"use server";

import {
  processStrapiMediaUrls,
  STRAPI_API_KEY,
  STRAPI_URL,
} from "@/lib/strapi-helpers";
import { unstable_cache } from "next/cache";
import qs from "qs";

export interface BlogLabels {
  data: {
    id: number;
    title: string;
    blogentries: Blogentries[];
  }[];
}

interface Blogentries {
  id: number;
  title: string;
  slug: string;
}

export const getBlogLabels = async (): Promise<BlogLabels> => {
  return unstable_cache(
    async (): Promise<BlogLabels> => {
      try {
        const query = qs.stringify({
          populate: {
            fields: "*",
            blogentries: {
              fields: "*",
            },
          },
        });

        // For a Single Type, we don't need an ID in the URL
        const response = await fetch(`${STRAPI_URL}/api/labels?${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog labels: ${response.status}`);
        }

        const responseData = await response.json();
        const bloglabels = responseData as BlogLabels;
        return { ...processStrapiMediaUrls(bloglabels) };
      } catch (error) {
        console.error("Error fetching blog labels:", error);
        throw error;
      }
    },
    ["blog-labels"],
    {
      revalidate: 60,
    }
  )();
};
