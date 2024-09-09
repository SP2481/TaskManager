"use client";
import { Box, Container } from "@mui/material";
import { Header } from "../header";
import { TopBar } from "../header/style";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <TopBar>
        <Header />
      </TopBar>
      <Container>{children}</Container>
    </Box>
  );
}
