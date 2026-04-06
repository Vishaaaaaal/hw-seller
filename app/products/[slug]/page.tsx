import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { ProductRail } from "@/components/product-rail";
import { ProductTabs } from "@/components/product-tabs";
import { RecentlyViewedRail, RecentlyViewedTracker } from "@/components/recently-viewed";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolved = await params;
  const product = getProductBySlug(resolved.slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: `${product.name} on Starway Diecast. ${product.brand}, ${product.category}, ${product.scale}, ${product.stockStatus}.`,
  };
}

export default async function ProductPage({ params }: Params) {
  const resolved = await params;
  const product = getProductBySlug(resolved.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <Container className="py-12">
      <RecentlyViewedTracker productId={product.id} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.brand, href: `/shop?brand=${encodeURIComponent(product.brand)}` },
          { label: product.name },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <ProductGallery product={product} />
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {product.brand}
              </span>
              <span className="rounded-full bg-canvas px-3 py-1 text-xs text-muted">{product.category}</span>
              <span className="rounded-full bg-canvas px-3 py-1 text-xs text-muted">{product.subcategory}</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-3xl font-bold text-text">{formatPrice(product.price)}</p>
              {product.originalPrice ? (
                <p className="text-lg text-muted line-through">{formatPrice(product.originalPrice)}</p>
              ) : null}
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  product.stockStatus === "In Stock"
                    ? "bg-success/10 text-success"
                    : product.stockStatus === "Pre-order"
                      ? "bg-warning/10 text-warning"
                      : "bg-danger/10 text-danger"
                }`}
              >
                {product.stockStatus}
              </span>
            </div>
            <p className="text-sm leading-8 text-muted">{product.description}</p>
          </div>

          <div className="surface-card grid gap-4 p-5 sm:grid-cols-2">
            {[
              ["Scale", product.scale],
              ["Material", product.material],
              ["Series", product.series],
              ["Release year", String(product.releaseYear)],
              ["SKU", product.sku],
              ["Brand", product.brand],
              ["Packaging", product.packagingType],
              ["Wave", product.wave],
            ].map(([label, value]) => (
              <div className="rounded-2xl bg-canvas p-4" key={label}>
                <p className="text-xs uppercase tracking-[0.22em] text-muted">{label}</p>
                <p className="mt-2 text-sm font-semibold text-text">{value}</p>
              </div>
            ))}
          </div>

          <ProductPurchasePanel disabled={product.stockStatus === "Sold Out"} productId={product.id} />

          <div className="rounded-[28px] border border-border bg-canvas p-5 text-sm text-muted">
            Delivery note: packaged with bubble wrap, corner support for carded pieces, and box reinforcement for premium or imported display models.
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ProductTabs product={product} />
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight text-text">Related products</h2>
        <div className="mt-8">
          <ProductRail products={related} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight text-text">Recently viewed</h2>
        <div className="mt-8">
          <RecentlyViewedRail currentProductId={product.id} />
        </div>
      </section>
    </Container>
  );
}
