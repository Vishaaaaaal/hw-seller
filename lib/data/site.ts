import type { Brand, ProductCategory } from "@/lib/types";

export const site = {
  name: "Starway Diecast",
  domain: "starwaystudio.com",
  announcement: "Demo Storefront - Placeholder catalog built for collector-first browsing.",
  email: "hello@starwaystudio.com",
  instagram: "@starwaydiecast",
  whatsapp: "+91 90000 00000",
};

export const navLinks = [
  { href: "/collections", label: "Top Brands" },
  { href: "/collections", label: "Shop" },
  { href: "/shop?sort=discount", label: "Special Offers" },
];

export const brands: Array<{
  name: Brand;
  blurb: string;
  badge: string;
}> = [
    {
      name: "Hot Wheels",
      badge: "HW",
      blurb: "Premium assortments, mainlines, boulevard drops, transport sets, and collector staples.",
    },
    {
      name: "Matchbox",
      badge: "MB",
      blurb: "Real-world castings, utility vehicles, and realistic finishes with broad collector appeal.",
    },
    {
      name: "Majorette",
      badge: "MJ",
      blurb: "European detailing, opening parts, and heritage-themed releases for display-friendly shelves.",
    },
    {
      name: "Mini GT",
      badge: "MG",
      blurb: "Precision 1:64 execution with motorsport, tuner, and supercar credibility.",
    },
    {
      name: "Pop Race",
      badge: "PR",
      blurb: "Aggressive aero kits, Pandem and Liberty Walk releases, and modern collector energy.",
    },
    {
      name: "Tarmac Works",
      badge: "TW",
      blurb: "Track-focused castings, liveried racers, and limited small-batch enthusiast favorites.",
    },
    {
      name: "Kaido House",
      badge: "KH",
      blurb: "Distinctive custom silhouettes, bold graphics, and highly sought-after boutique drops.",
    },
  ];

export const collectionCards: Array<{
  name: string;
  category?: ProductCategory;
  brand?: Brand;
  href: string;
  description: string;
}> = [
    {
      name: "Hot Wheels Premium",
      category: "Premium",
      brand: "Hot Wheels",
      href: "/shop?brand=Hot+Wheels&category=Premium",
      description: "Metal/metal castings, rubber tires, and high-detail liveries for serious display shelves.",
    },
    {
      name: "Silver Series",
      category: "Silver Series",
      brand: "Hot Wheels",
      href: "/shop?brand=Hot+Wheels&category=Silver+Series",
      description: "Special mid-tier assortments with collector packaging and premium-adjacent presence.",
    },
    {
      name: "Mainlines",
      category: "Mainline",
      brand: "Hot Wheels",
      href: "/shop?brand=Hot+Wheels&category=Mainline",
      description: "Core pegs, fresh case finds, and iconic castings with fast turnover and broad reach.",
    },
    {
      name: "Imported",
      category: "Imported",
      href: "/shop?category=Imported&imported=1",
      description: "Rare overseas assortments and harder-to-source models for niche collector demand.",
    },
    {
      name: "Mini GT",
      brand: "Mini GT",
      href: "/shop?brand=Mini+GT",
      description: "Crisp execution across GT racers, tuned exotics, and widebody supercars.",
    },
    {
      name: "Matchbox",
      brand: "Matchbox",
      href: "/shop?brand=Matchbox",
      description: "Utility, realism, and everyday hero vehicles with display-worthy authenticity.",
    },
    {
      name: "Majorette",
      brand: "Majorette",
      href: "/shop?brand=Majorette",
      description: "Heritage-focused European castings with opening features and polished presentation.",
    },
    {
      name: "Pop Race",
      brand: "Pop Race",
      href: "/shop?brand=Pop+Race",
      description: "Pandem, drift, and tuner-led casts for collectors who want strong shelf personality.",
    },
    {
      name: "Limited Editions",
      category: "Limited Edition",
      href: "/shop?category=Limited+Edition",
      description: "Short-run drops, numbered packaging, and premium scarcity built into the experience.",
    },
    {
      name: "Pre-orders",
      category: "Pre-order",
      href: "/shop?availability=Pre-order",
      description: "Upcoming waves, allocations, and secured future releases for planned collecting.",
    },
    {
      name: "Sale / Deals",
      href: "/shop?sort=price-low",
      description: "Value-focused picks, catalog movers, and bundle-friendly placeholders for promo merchandising.",
    },
  ];

export const highlights = [
  {
    title: "Collector-grade curation",
    description: "Every wave is structured like a catalog, not a random product dump, so browsing stays fast and intentional.",
  },
  {
    title: "Safe packaging promise",
    description: "Carded and boxed models are packed with shelf condition in mind, including corner protection and void fill.",
  },
  {
    title: "Imported release access",
    description: "Rare overseas assortments, pre-orders, and boutique brands are merchandised alongside peg-friendly staples.",
  },
  {
    title: "Built for repeat visits",
    description: "New arrivals, sold out archives, and recently viewed rails help collectors track what matters over time.",
  },
];

export const faqItems = [
  {
    question: "Are the products original?",
    answer: "Yes. Starway Diecast is positioned as a collector-led storefront focused on authentic brand releases and clearly labeled catalog entries.",
  },
  {
    question: "Do you stock imported models?",
    answer: "Yes. Imported assortments, boutique brands, and special releases are separated with dedicated filters so collectors can browse them quickly.",
  },
  {
    question: "Can I pre-order upcoming releases?",
    answer: "Yes. Pre-orders are surfaced as a distinct availability state with clear delivery-window messaging and allocation-style presentation.",
  },
  {
    question: "How are diecasts packaged for shipping?",
    answer: "The demo positioning emphasizes safe packing, card protection, and padding suitable for collectors who care about shelf condition.",
  },
  {
    question: "Do sold out items come back?",
    answer: "Some do, especially wider releases or restocks. Limited editions and boutique drops may remain in the archive as reference-only listings.",
  },
  {
    question: "Are carded and uncarded products listed separately?",
    answer: "Yes. Packaging format is treated as a product attribute so collectors can filter by carded and uncarded releases when browsing.",
  },
];
