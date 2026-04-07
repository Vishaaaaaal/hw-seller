import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopExperience } from "@/components/shop-experience";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse a collector-focused diecast catalog with filters for Hot Wheels, Mini GT, Matchbox, imports, premium assortments, and pre-orders.",
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopExperience />
    </Suspense>
  );
}
