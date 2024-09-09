"use client";
import { useLogin } from "@/hooks/useLogin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import HomeLayout from "../components/layouts/home.layout";

const queryClient = new QueryClient();

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLogin();
  return (
    <QueryClientProvider client={queryClient}>
      <HomeLayout>{children}</HomeLayout>
    </QueryClientProvider>
  );
}
