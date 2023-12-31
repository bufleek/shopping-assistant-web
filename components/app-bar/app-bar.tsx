"use client";

import Image from "next/image";
import { Box, Container, Link, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { logEvent, EventNames, EventParams, SearchLocations } from "@/lib/analytics";

export default function AppBar() {
  const query = useSearchParams().get("query")?.toString()?.trim() || "";

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newQuery = formData.get("query")?.toString()?.trim();
    if (newQuery && newQuery !== query) {
      logEvent(EventNames.SEARCH, {
        [EventParams.SEARCH_TERM]: newQuery,
        [EventParams.SEARCH_LOCATION]: SearchLocations.SEARCH_RESULTS,
      });
      window.location.href = `/browse?query=${newQuery}`;
    }
  };

  return (
    <Container maxWidth="lg" className="bg-inherit">
      <Stack
        py={1.5}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box height={40} width={40}>
          <Link href="/">
            <span className="sr-only">Logo</span>
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
        </Box>
        <form action="/browse" method="GET" onSubmit={handleSearch}>
          <input
            defaultValue={query || ""}
            name="query"
            type="search"
            placeholder="Search"
            className="rounded px-4 py-2 bg-white text-black outline-none"
          />
        </form>
      </Stack>
    </Container>
  );
}
