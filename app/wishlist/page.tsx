import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { WishlistView } from "@/components/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save products for later in the Starway Diecast demo wishlist and move shortlisted castings into the cart.",
};

export default function WishlistPage() {
  return (
    <>
      <Container className="pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
        <SectionHeading className="mt-6" eyebrow="Wishlist" title="Saved collector picks" />
      </Container>
      <WishlistView />
    </>
  );
}
