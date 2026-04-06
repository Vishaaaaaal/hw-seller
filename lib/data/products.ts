import { slugify } from "@/lib/utils";
import type { Brand, Product, ProductCategory, Scale, StockStatus, VehicleType } from "@/lib/types";

type SeedProduct = {
  name: string;
  brand: Brand;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  stockStatus: StockStatus;
  scale: Scale;
  imported: boolean;
  carded: boolean;
  series: string;
  releaseYear: number;
  wave: string;
  vehicleType: VehicleType;
  featured?: boolean;
  newArrival?: boolean;
  popularity: number;
  packagingType: string;
  color: string;
  image?: string;
};

function buildProduct(seed: SeedProduct, index: number): Product {
  const slug = slugify(seed.name);
  const sku = `SWD-${seed.releaseYear}-${String(index + 1).padStart(3, "0")}`;

  return {
    id: `product-${index + 1}`,
    slug,
    name: seed.name,
    brand: seed.brand,
    category: seed.category,
    subcategory: seed.subcategory,
    price: seed.price,
    originalPrice: seed.originalPrice,
    stockStatus: seed.stockStatus,
    scale: seed.scale,
    imported: seed.imported,
    carded: seed.carded,
    series: seed.series,
    releaseYear: seed.releaseYear,
    wave: seed.wave,
    vehicleType: seed.vehicleType,
    description: `${seed.name} is positioned as a collector-ready ${seed.scale} release with premium shelf presence, crisp detailing, and catalog-first presentation for Starway Diecast.`,
    collectorNotes: `Selected for ${seed.series.toLowerCase()} depth, ${seed.vehicleType.toLowerCase()} appeal, and strong display value across both carded and loose-style collector setups.`,
    sku,
    image: seed.image || `${seed.brand}|${seed.color}|hero`,
    images: [
      `${seed.brand}|${seed.color}|front`,
      `${seed.brand}|${seed.color}|side`,
      `${seed.brand}|${seed.color}|pack`,
    ],
    featured: seed.featured ?? false,
    newArrival: seed.newArrival ?? false,
    popularity: seed.popularity,
    packagingType: seed.packagingType,
    material: "Die-cast metal body with detailed plastic parts",
  };
}

import seedsRaw from "./products.json";

const seeds: SeedProduct[] = seedsRaw as SeedProduct[];

export const products = seeds.map(buildProduct);

export const featuredProducts = products.filter((product) => product.featured).slice(0, 8);
export const newArrivalProducts = products.filter((product) => product.newArrival).slice(0, 8);
