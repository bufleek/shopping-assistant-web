"use client";

import AppBar from "@/components/app-bar/app-bar";
import { Box } from "@mui/material";
import { defaultMetadata } from "@/lib/metadata";
// import { Metadata } from "next";
import SectionedProductsLayout from "@/components/products/sectioned-products-layout";
import { useEffect } from "react";

// export const metadata: Metadata = buildMetadata({
//   title: `${defaultMetadata.title} | Browse`,
// });

export default function Page() {
  useEffect(() => {
    document.title = `Browse | ${defaultMetadata.title}`;
  }
  , []);

  return (
    <>
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

        <Box className="text-black" bgcolor="white" pb={4} sx={{
          minHeight: "100vh",
        }}>
          <SectionedProductsLayout />
        </Box>
      </div>
    </>
  );
}
