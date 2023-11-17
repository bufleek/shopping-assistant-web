"use client";

import { useContext } from "react";
import AppBar from "@/components/app-bar/app-bar";
import SearchInput from "@/components/products/search-input";
import { AppConfigsContext } from "@/components/providers";
import ProductSection from "@/components/products/product-section";

export default function Browse() {
  const query = new URLSearchParams(window.location.search).get("query");
  const { appConfigs } = useContext(AppConfigsContext);

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
      }}
    >
      <AppBar />
      <div className="h-full bg-white">
        <div className="py-1 mt-4">
          <SearchInput initialValue={query ?? ""} />
        </div>
        <div className="flex flex-col gap-16 pb-20">
          {appConfigs?.data_source?.platforms?.map((platform: any) => {
            return (
              <ProductSection
                key={platform.key}
                platform={platform}
                query={query}
                base_url={appConfigs.data_source.base_url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
