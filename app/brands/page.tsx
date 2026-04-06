import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { brands } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Brands",
  description: "Discover Hot Wheels, Matchbox, Majorette, Mini GT, Pop Race, Tarmac Works, and Kaido House on Starway Diecast.",
};

export default function BrandsPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />
      <SectionHeading
        className="mt-6"
        description="Brand-first browsing makes the catalog feel familiar to collectors who shop by maker, series credibility, or release style."
        eyebrow="Brands"
        title="Supported diecast brands"
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {brands.map((brand) => (
          <Link
            className="surface-card group flex flex-col gap-4 p-6 hover:-translate-y-1 hover:border-primary/20"
            href={`/shop?brand=${encodeURIComponent(brand.name)}`}
            key={brand.name}
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-base font-bold text-primary">
                {brand.badge}
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-text">{brand.name}</h2>
                <p className="text-sm text-muted">Logo placeholder / badge treatment</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-muted">{brand.blurb}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
