import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS,
};

export const buildMetadata = (metadata: Metadata = defaultMetadata) => {
  return {
    ...defaultMetadata,
    ...metadata,
  };
};
