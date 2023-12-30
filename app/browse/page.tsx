"use client";

import { useContext } from "react";
import { useSearchParams } from "next/navigation";
import AppBar from "../../components/app-bar/app-bar";
import { AppConfigsContext } from "../../components/providers";
import ProductSection from "../../components/products/product-section";
import { Box, Stack } from "@mui/material";

export default function Browse() {
  const query = useSearchParams().get("query");
  const { appConfigs } = useContext(AppConfigsContext);

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
      }}
    >
      <Box className="bg-start" sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <AppBar />
      </Box>

      <Stack
        direction="column"
        bgcolor="white"
        height="100%"
        pb={4}
      >
        {appConfigs && appConfigs.data_source.platforms.map((platform: any) => {
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
    </div>
  );
}
