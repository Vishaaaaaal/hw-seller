import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CartView } from "@/components/cart-view";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your demo cart, adjust quantities, and inspect an order summary for the Starway Diecast storefront concept.",
};

export default function CartPage() {
  return (
    <>
      <Container className="pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
        <SectionHeading className="mt-6" eyebrow="Cart" title="Collector cart" />
      </Container>
      <CartView />
    </>
  );
}
