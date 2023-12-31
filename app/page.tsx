import SearchInput from "../components/products/search-input";
import { Stack } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div
      id="landing"
      style={{
        height: "100dvh",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
      }}
    >
      < Stack direction={{
        xs: "column",
        sm: "row",
      }} justifyContent="center" pt={4} alignItems="center" spacing={1}>
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <h3 className="text-2xl">Shopping Assistant</h3>
      </Stack>
      <main className="h-full">
        <div className="flex justify-center align-center flex-col py-20 h-full">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-center">
            Explore multiple online stores with one search
          </h1>
          <h2 className="text-center text-lg mt-5">
            We help you find the best products from multiple online stores in one place.
          </h2>
          <div className="mt-10">
            <SearchInput />
          </div>
        </div>
      </main>
    </div>
  );
}
