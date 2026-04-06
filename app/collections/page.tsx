import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { brands } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore diecast collection lanes organized by brand and categories.",
};

// Define the brand-centric hierarchical data
// We're structuring this locally for the visual layout of the collections page.
const brandHierarchies = [
  {
    brandName: "Hot Wheels",
    badge: "HW",
    logoImage: "/images/hot-wheels-logo.png",
    href: "/shop?brand=Hot+Wheels",
    bgImage: "/images/Hot-Wheelsbg.jpg",
    description: "Premium assortments, mainlines, boulevard drops, transport sets, and collector staples.",
    subCollections: [
      {
        name: "Mainlines",
        href: "/shop?brand=Hot+Wheels&category=Mainline",
        description: "Core pegs, fresh case finds, and iconic castings with fast turnover.",
        badge: "ML"
      },
      {
        name: "Silver Series",
        href: "/shop?brand=Hot+Wheels&category=Silver+Series",
        description: "Special mid-tier assortments with collector packaging.",
        badge: "SS"
      },
      {
        name: "Premium",
        href: "/shop?brand=Hot+Wheels&category=Premium",
        description: "Metal/metal castings, rubber tires, and high-detail liveries.",
        badge: "PR"
      },
      {
        name: "Boulevard",
        href: "/shop?brand=Hot+Wheels&category=Boulevard",
        description: "Highly sought-after premium subsets with exclusive automotive culture.",
        badge: "BV"
      }
    ]
  },
  {
    brandName: "Mini GT",
    badge: "MG",
    logoImage: "/images/MINI_GT_logo.svg.png",
    href: "/shop?brand=Mini+GT",
    bgImage: "/images/minigtbg.jpg",
    description: "Precision 1:64 execution with motorsport, tuner, and supercar credibility.",
    subCollections: [
      {
        name: "Mini GT",
        href: "/shop?brand=Mini+GT",
        description: "Standard precision 1:64 scale execution models.",
        badge: "MG"
      },
      {
        name: "Kaido House",
        href: "/shop?brand=Kaido+House",
        description: "Distinctive custom silhouettes and highly sought-after boutique drops.",
        badge: "KH"
      }
    ]
  },
  {
    brandName: "Majorette",
    badge: "MJ",
    href: "/shop?brand=Majorette",
    description: "European detailing, opening parts, and heritage-themed releases.",
    subCollections: [
      {
        name: "Premium Editions",
        href: "/shop?brand=Majorette&category=Premium",
        description: "Detailed European models with functional doors and parts.",
        badge: "PE"
      },
      {
        name: "Classic / Vintage",
        href: "/shop?brand=Majorette&vehicle=Classic",
        description: "Heritage cars celebrating decades of automotive history.",
        badge: "CV"
      }
    ]
  },
  {
    brandName: "Matchbox",
    badge: "MB",
    href: "/shop?brand=Matchbox",
    description: "Real-world castings, utility vehicles, and realistic finishes.",
    subCollections: [
      {
        name: "Moving Parts",
        href: "/shop?brand=Matchbox",
        description: "Special real-world vehicles with operating hoods and doors.",
        badge: "MP"
      },
      {
        name: "Utility & Off-Road",
        href: "/shop?brand=Matchbox&vehicle=SUV+%2F+Truck",
        description: "Mud-ready trucks and city service vehicles.",
        badge: "UT"
      }
    ]
  },

];


export default function CollectionsPage() {
  return (
    <div className="pb-24">
      {/* Header Area */}
      <div
        className="relative border-b border-border pt-12 pb-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/collectionbg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />

          <div className="mt-8">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">Shop</span>
            <h1 className="mt-2 font-display text-5xl font-extrabold text-black tracking-tight">Shop</h1>
            <p className="mt-4 text-lg text-black/80 font-medium max-w-2xl leading-relaxed">
              Browse our diecast inventory through structured brand hierarchies and curated subcategories.
            </p>
          </div>
        </Container>
      </div>

      {/* Brand Hierarchies */}
      <Container className="mt-16 space-y-24">
        {brandHierarchies.map((brandSection, index) => (
          <section key={brandSection.brandName} className="relative">
            {brandSection.bgImage && (
              <div
                className="pointer-events-none absolute inset-0 -top-8 -bottom-8 -mx-4 sm:-mx-10 rounded-[40px] bg-cover bg-center opacity-[0.12] mix-blend-multiply"
                style={{ backgroundImage: `url('${brandSection.bgImage}')` }}
              />
            )}

            {/* Visual Divider line behind the title dot */}
            {index !== 0 && (
              <div className="absolute top-0 left-8 md:left-12 -mt-16 w-px h-16 bg-gradient-to-b from-transparent to-border/50" />
            )}

            {/* Brand Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-6 relative">
              <div className="flex gap-4 items-center">
                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-canvas text-lg font-bold text-text shrink-0 shadow-sm border border-border overflow-hidden">
                  {brandSection.logoImage ? (
                    <img src={brandSection.logoImage} alt={`${brandSection.brandName} badge`} className="w-full h-full object-contain p-1" />
                  ) : (
                    brandSection.badge
                  )}
                </div>
                <div>
                  <h2 className="font-display text-4xl font-bold text-text group-hover:text-primary transition-colors">
                    {brandSection.brandName}
                  </h2>
                  <p className="mt-2 text-base text-muted max-w-2xl">{brandSection.description}</p>
                </div>
              </div>
              <Link
                href={brandSection.href}
                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text shadow-sm transition-all hover:bg-canvas hover:border-primary/30 group"
              >
                View all {brandSection.brandName}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            {/* Subcollections Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brandSection.subCollections.map(sub => {
                let cardTheme = "bg-white border-border hover:border-primary/40 hover:shadow-soft text-text";
                let badgeTheme = "bg-canvas text-text group-hover:bg-primary group-hover:text-white";
                let shopLinkTheme = "text-primary";

                if (sub.name === "Mainlines") {
                  cardTheme = "bg-blue-50 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] text-slate-900";
                  badgeTheme = "bg-white text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white";
                  shopLinkTheme = "text-blue-600";
                } else if (sub.name === "Silver Series") {
                  cardTheme = "bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.3)] hover:border-slate-300 hover:shadow-[0_0_30px_rgba(148,163,184,0.7)] text-slate-900";
                  badgeTheme = "bg-white text-slate-800 shadow-sm group-hover:bg-slate-800 group-hover:text-white";
                  shopLinkTheme = "text-slate-800";
                } else if (sub.name === "Premium") {
                  cardTheme = "bg-[#0A1128] border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:border-yellow-300 hover:shadow-[0_0_35px_rgba(234,179,8,0.8)] text-white";
                  badgeTheme = "bg-white/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-[#0A1128]";
                  shopLinkTheme = "text-yellow-500";
                }

                return (
                  <Link
                    href={sub.href}
                    key={sub.name}
                    className={`group relative overflow-hidden rounded-[24px] border p-6 transition-all duration-500 hover:-translate-y-1 block min-h-[180px] flex flex-col ${cardTheme}`}
                  >
                    {/* subtle top bar highlight */}
                    {(sub.name !== "Premium" && sub.name !== "Silver Series") && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary-dark opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    )}

                    <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors duration-500 ${badgeTheme}`}>
                      {sub.badge}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{sub.name}</h3>
                    <p className={`text-sm leading-relaxed flex-grow ${sub.name === "Premium" ? "text-white/70" : "text-muted"}`}>{sub.description}</p>

                    <div className={`mt-4 opacity-0 transform translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-xs font-bold flex items-center gap-1 ${shopLinkTheme}`}>
                      Shop Lane <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </Link>
                );
              })}

              {/* Decorative/Empty lane card if needed */}
              {brandSection.subCollections.length % 2 !== 0 && (
                <div className="hidden xl:flex rounded-[24px] border border-dashed border-border/50 bg-transparent p-6 items-center justify-center opacity-50">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest text-center">More drops incoming</p>
                </div>
              )}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
}
