import SearchInput from "@/components/products/search-input";
import AppBar from "../components/app-bar/app-bar";
import { metadata } from "./layout";

export default function Home() {
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
        <main className="flex justify-center align-center flex-col py-20 h-full">
          <h2 className="text-4xl font-bold text-center">
            Explore 10+ Stores, All at Once!
          </h2>
          <p className="text-center text-lg mt-5">{metadata.description}</p>
          <div className="mt-10">
            <SearchInput />
          </div>
        </main>
      </div>
    </div>
  );
}
