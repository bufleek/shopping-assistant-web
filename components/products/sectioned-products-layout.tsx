"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { AppConfigsContext } from "@/components/providers";
import ProductSection from "@/components/products/product-section";
import { Stack } from "@mui/material";
import { shuffle } from "@/utils/arrays";
import { Platform } from "@/data/models/app_configs";

export default function SectionedProductsLayout() {
  const query = useSearchParams().get("query");
  const { appConfigs } = useContext(AppConfigsContext);
  const [platforms, setPlatforms] = useState([] as Platform[]);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && appConfigs) {
      isInitialized.current = true;
      setPlatforms(shuffle(appConfigs.data_source.platforms));
    }
  }, [appConfigs]);

  return (
    <Stack direction="column">
      {appConfigs && platforms.map((platform: Platform) => {
          return (
            <ProductSection
              key={platform.key}
              platform={platform}
              query={query}
              base_url={appConfigs.data_source.base_url}
            />
          );
        })}
    </Stack>
  );
}
