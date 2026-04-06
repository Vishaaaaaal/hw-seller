import Link from "next/link";
import { collectionCards, brands, highlights } from "@/lib/data/site";
import { featuredProducts, newArrivalProducts } from "@/lib/data/products";
import { CollectionCard } from "@/components/collection-card";
import { Container } from "@/components/container";
import { ProductRail } from "@/components/product-rail";
import { SectionHeading } from "@/components/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { HeroCarousel } from "@/components/hero-carousel";
import { NewsletterPopup } from "@/components/newsletter-popup";

export default function HomePage() {
  return (
    <div className="pb-16 selection:bg-primary/20 selection:text-primary-dark">
      {/* 
        HERO SECTION 
        Premium, automotive-inspired dark aesthetic for immediate impact, 
        using abstract or placeholder imagery that elevates the diecast feel.
      */}
      <div className="relative overflow-hidden bg-[#0A0D14] text-white">

        <HeroCarousel />

        <Container className="relative z-10 pt-28 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40 text-center flex flex-col items-center justify-center min-h-[85vh]">
          <div className="max-w-4xl space-y-8 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Starway Diecast
            </div>

            <h1 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.15] drop-shadow-2xl">
              Curated Diecast for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Detail Obsessed.</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/90 sm:text-2xl drop-shadow-lg">
              Premium, mainline, imports, and collector favorites. A serious storefront built by collectors, for collectors.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-white/90 shadow-xl"
                href="/shop"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse the Catalog
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <Link
                className="group inline-flex items-center justify-center rounded-full border border-white/30 bg-black/40 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/50 shadow-lg"
                href="/collections"
              >
                Explore Collections
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 sm:gap-16 border-t border-white/20 pt-12 mt-12 bg-black/10 backdrop-blur-[2px] px-8 sm:px-16 pb-6 rounded-3xl">
              <div>
                <p className="text-4xl font-display font-black text-white drop-shadow-md">60+</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">Premium SKUs</p>
              </div>
              <div>
                <p className="text-4xl font-display font-black text-white drop-shadow-md">7</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">Boutique Brands</p>
              </div>
              <div>
                <p className="text-4xl font-display font-black text-white drop-shadow-md">24h</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">Collector Shipping</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* NEW ARRIVALS */}
      <Container className="relative mt-24">
        {/* Glow behind rail */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-full -translate-x-1/2 -translate-y-1/2 bg-hero-grid opacity-50" />

        <SectionHeading
          cta="View all drops"
          description="Fresh waves and limited allocations just loaded into the inventory."
          eyebrow="Just Landed"
          href="/shop?sort=newest"
          title="Latest Arrivals"
        />
        <div className="mt-10 relative z-10">
          <ProductRail products={newArrivalProducts} />
        </div>
      </Container>


      {/* BRANDS BENTO BOARD */}
      <Container className="mt-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Shop By Brand</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">The Collector Roster</h2>
          </div>
          <Link href="/brands" className="text-sm font-semibold text-muted hover:text-primary transition-colors flex items-center gap-1">
            See all brands <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand, i) => (
            <Link
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft hover:border-primary/30"
              href={`/shop?brand=${encodeURIComponent(brand.name)}`}
              key={brand.name}
            >
              {/* Subtle accent hover line top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-canvas text-xl font-bold text-text transition-colors group-hover:bg-primary group-hover:text-white">
                {brand.badge}
              </div>
              <h3 className="text-xl font-bold text-text">{brand.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{brand.blurb}</p>

              <div className="mt-auto pt-6 opacity-0 transform translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                <span className="text-xs font-bold text-primary flex items-center gap-1">
                  Explore <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>


      {/* FEATURED COLLECTIONS GRID */}
      <Container className="mt-32">
        <SectionHeading
          cta="All curated collections"
          description="Premium themes, silver series, imported drops, and display-ready lanes."
          eyebrow="Curated"
          href="/collections"
          title="Curated Viewing Lanes"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          {/* Large showcase card - taking up 8 columns on large screens */}
          {collectionCards[0] && (
            <div className="md:col-span-12 lg:col-span-8 group relative overflow-hidden rounded-[32px] border border-border bg-surface shadow-sm transition-all hover:shadow-soft">
              <div className="absolute inset-0 bg-hero-grid opacity-30 mix-blend-multiply transition-opacity group-hover:opacity-50" />
              <div className="p-8 sm:p-12 relative z-10 flex h-full flex-col justify-end">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Featured Drop</p>
                <h3 className="font-display text-4xl sm:text-5xl font-bold text-text max-w-lg leading-tight">{collectionCards[0].name}</h3>
                <p className="mt-4 text-base text-muted max-w-md">{collectionCards[0].description}</p>
                <div className="mt-8">
                  <Link href={collectionCards[0].href} className="inline-flex h-12 items-center justify-center rounded-full bg-text px-6 font-semibold text-white transition-all hover:scale-105 hover:bg-black">
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Sibling card - 4 columns */}
          {collectionCards[1] && (
            <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[32px] bg-canvas border border-border p-8 transition-all hover:border-primary/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl font-bold text-text mb-6 group-hover:scale-110 transition-transform">
                {collectionCards[1].name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="font-display text-2xl font-bold text-text">{collectionCards[1].name}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{collectionCards[1].description}</p>
              <Link href={collectionCards[1].href} className="absolute inset-0 z-10">
                <span className="sr-only">{collectionCards[1].name}</span>
              </Link>
              <div className="absolute bottom-8 right-8 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          )}

          {/* Remaining collection cards */}
          {collectionCards.slice(2, 5).map((collection) => (
            <div key={collection.name} className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[32px] bg-white border border-border p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-canvas text-lg font-bold text-text mb-6">
                {collection.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="font-display text-xl font-bold text-text">{collection.name}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{collection.description}</p>
              <Link href={collection.href} className="absolute inset-0 z-10">
                <span className="sr-only">{collection.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>


      {/* FAST WAYS INTO CATALOG (Pills) */}
      <Container className="mt-32">
        <div className="surface-panel overflow-hidden relative border-none bg-gradient-to-br from-surface to-canvas p-10 sm:p-14 shadow-panel">
          {/* Decor */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-primary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Hot Categories</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-text">Shortcuts into the catalog</h2>
              <p className="mt-4 text-base text-muted">Jump straight into the most searched classifications by our community.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "JDM Exclusives", href: "/shop?vehicle=JDM" },
                { label: "Supercars", href: "/shop?vehicle=Supercar" },
                { label: "Collector Sets", href: "/shop?category=Collector+Set" },
                { label: "Incoming Pre-orders", href: "/shop?availability=Pre-order" },
                { label: "Sold Out Archive", href: "/shop?availability=Sold+Out" },
              ].map((item) => (
                <Link className="group relative overflow-hidden rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text transition-all hover:border-primary hover:text-primary hover:shadow-sm" href={item.href} key={item.label}>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>


      {/* FEATURED PRODUCTS W/ HORIZONTAL SCROLL */}
      <Container className="mt-32">
        <SectionHeading
          cta="View all products"
          description="A second rail for best-sellers, premium castings, and collector-oriented hero products."
          eyebrow="Best Sellers"
          href="/shop?sort=popularity"
          title="Collector Favorites"
        />
        <div className="mt-10">
          <ProductRail products={featuredProducts} />
        </div>
      </Container>

      {/* WHY SHOP WITH US */}
      <Container className="mt-32">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text mb-4"> credibility. packed. safely.</h2>
          <p className="text-muted text-base">We treat every package the way we'd want our own collections delivered.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <div className="surface-card flex flex-col items-center text-center p-8 transition-all hover:-translate-y-1 hover:border-primary/20" key={highlight.title}>
              <div className="h-12 w-12 rounded-full bg-canvas flex items-center justify-center text-primary mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{highlight.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{highlight.description}</p>
            </div>
          ))}
        </div>
      </Container>


      {/* NEWSLETTER / PROMO BANNER */}
      <Container className="my-32">
        <section className="relative overflow-hidden rounded-[40px] bg-[#1A1E29] text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/2 rounded-full bg-white/5 blur-[80px]" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.8fr] p-10 sm:p-16 lg:p-20">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm border border-white/5">
                Limited Allocations
              </div>
              <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
                Secure your grails before they vanish.
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
                Join our allocation list to get early access to incoming premium cases, rare imports, and exclusive collector events.
              </p>

              <div className="mt-10 flex max-w-md items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input type="email" placeholder="collector@email.com" className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none" />
                <button className="whitespace-nowrap rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                  Join List
                </button>
              </div>
            </div>

            {/* Visual element */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[32px] rotate-3 backdrop-blur-sm border border-white/10" />
              <div className="relative z-10 w-full h-[300px] overflow-hidden rounded-[24px] border border-white/20 shadow-xl">
                <PlaceholderImage product={newArrivalProducts[0]} label="High-End Model Box Set" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E29] to-transparent via-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xl font-bold">Upcoming Pre-order Wave</p>
                  <p className="text-sm text-white/70">Drops next Thursday at 12:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
      <NewsletterPopup />
    </div>
  );
}
