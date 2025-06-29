"use server";

import {
  populateImageFields,
  processStrapiMediaUrls,
  STRAPI_API_KEY,
  STRAPI_URL,
} from "@/lib/strapi-helpers";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { unstable_cache } from "next/cache";
import qs from "qs";

export interface RichtextBanner {
  __component: "components.richtext";
  id: number;
  title: string;
  text: BlocksContent;
}

export interface ImageBanner {
  __component: "components.imagebanner";
  id: number;
  title: string;
  image: StrapiImage;
}

export type Component = RichtextBanner | ImageBanner;

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
    components: Component[];
  };
}

interface StrapiImage {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}

export const getBlogpostBySlug = async (
  slug: string
): Promise<BlogPost["data"] | null> => {
  return unstable_cache(
    async (): Promise<BlogPost["data"] | null> => {
      try {
        if (!slug) throw new Error("Slug is required to fetch a blog post.");
        const query = qs.stringify({
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: {
            fields: "*",
            components: {
              on: {
                "components.richtext": {
                  fields: "*",
                },
                "components.imagebanner": {
                  populate: {
                    fields: "*",
                    image: {
                      fields: populateImageFields,
                    },
                  },
                },
              },
            },
          },
        });

        const response = await fetch(
          `${STRAPI_URL}/api/blogentries/?${query}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${STRAPI_API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch blog post ${slug}: ${response.status}`
          );
        }

        const responseData = await response.json();
        // Strapi returns an array in responseData.data
        if (!responseData.data || responseData.data.length === 0) {
          return null;
        }
        const blogpost = responseData.data[0];
        return processStrapiMediaUrls(blogpost);
      } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        throw error;
      }
    },
    [`blog-post-${slug}`],
    {
      revalidate: 60,
    }
  )();
};
