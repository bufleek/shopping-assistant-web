import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  keywords: process.env.APP_KEYWORDS,
};

const buildMetadata = (metadata: Metadata = defaultMetadata) => {
  return {
    ...defaultMetadata,
    ...metadata,
  };
};

export default buildMetadata;
