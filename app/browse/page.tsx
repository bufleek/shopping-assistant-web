"use client";

import AppBar from "@/components/app-bar/app-bar";
import { Box } from "@mui/material";
// import { defaultMetadata, buildMetadata } from "@/lib/metadata";
// import { Metadata } from "next";
import SectionedProductsLayout from "@/components/products/sectioned-products-layout";

// export const metadata: Metadata = buildMetadata({
//   title: `${defaultMetadata.title} | Browse`,
// });

export default function Browse() {
  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
      }}
    >
      <Box
        className="bg-start"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <AppBar />
      </Box>

      <Box bgcolor="white" height="100%" pb={4}>
        <SectionedProductsLayout />
      </Box>
    </div>
  );
}
