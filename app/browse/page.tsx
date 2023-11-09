import ProductSection from "@/components/products/product-section";
import AppBar from "@/components/app-bar/app-bar";
import SearchInput from "@/components/products/search-input";

export default function Browse() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
      }}
    >
      <AppBar />
      <div className="h-full">
        <div className="bg-white">
          <SearchInput />
        </div>
        <ProductSection />
      </div>
    </div>
  );
}
