"use client";

import Image from "next/image";
import { Box, Container, Link, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function AppBar() {
  const query = useSearchParams().get("query");

  return (
    <Container maxWidth="lg" className="bg-inherit">
      <Stack
        py={1.5} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Box height={40} width={40}>
          <Link href="/">
            <span className="sr-only">Logo</span>
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
        </Box>
        <form
          action="/browse"
          method="GET"
        >
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
