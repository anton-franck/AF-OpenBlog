export const STRAPI_URL = process.env.STRAPI_URL || "";
export const STRAPI_API_KEY = process.env.STRAPI_API_KEY || "";

export type Image = {
  data: {
    id: string;
    attributes?: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
    };
  };
};

export type Video = {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
    };
  };
};

export type SEOData = {
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  meta_share_image?: Image;
};

const getStrapiMediaUrl = (url: string) => {
  // If the URL is already absolute, return it as is
  if (url.startsWith("http")) {
    return url;
  }
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
};

export const populateImageFields = [
  "url",
  "alternativeText",
  "width",
  "height",
];

export const populateVideoFields = ["url", "name"];

export const processStrapiMediaUrls = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processStrapiMediaUrls(item));
  }

  const result: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === "url" && typeof value === "string") {
      result[key] = getStrapiMediaUrl(value);
    } else if (typeof value === "object" && value !== null) {
      result[key] = processStrapiMediaUrls(value);
    } else {
      result[key] = value;
    }
  }

  return result;
};
