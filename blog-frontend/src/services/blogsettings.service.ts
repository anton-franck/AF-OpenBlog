"use server";

import {
  populateImageFields,
  processStrapiMediaUrls,
  STRAPI_API_KEY,
  STRAPI_URL,
} from "@/lib/strapi-helpers";
import { unstable_cache } from "next/cache";
import qs from "qs";

export interface BlogPageSettings {
  id: number;
  title: string;
  description: string;
  name: string;
  defaultseotitle: string;
  seodescription: string;
  fromothersite: boolean;
  othersitelink: string;
  contactmail: string;
  siteadminname: string;
  icon: StrapiImage;
}

interface StrapiImage {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}

export const getBlogpageSettings = async (): Promise<BlogPageSettings> => {
  return unstable_cache(
    async (): Promise<BlogPageSettings> => {
      try {
        const query = qs.stringify({
          populate: {
            fields: "*",
            icon: {
              fields: populateImageFields,
            },
          },
        });

        // For a Single Type, we don't need an ID in the URL
        const response = await fetch(`${STRAPI_URL}/api/blog?${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog settings: ${response.status}`);
        }

        const responseData = await response.json();
        const blogsettings = responseData.data as BlogPageSettings;
        return processStrapiMediaUrls(blogsettings);
      } catch (error) {
        console.error("Error fetching blog page:", error);
        throw error;
      }
    },
    ["blog-settings"],
    {
      revalidate: 60, // Revalidate every minute
    }
  )();
};
