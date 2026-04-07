export type Brand =
  | "Hot Wheels"
  | "Matchbox"
  | "Majorette"
  | "Mini GT"
  | "Pop Race"
  | "Tarmac Works"
  | "Kaido House";

export type ProductCategory =
  | "Premium"
  | "Silver Series"
  | "Mainline"
  | "Imported"
  | "Collector Set"
  | "Team Transport"
  | "Boulevard"
  | "Pop Culture"
  | "Pre-order"
  | "Limited Edition";

export type StockStatus = "In Stock" | "Sold Out" | "Pre-order";
export type Scale = "1:64" | "1:43" | "1:24";
export type VehicleType =
  | "JDM"
  | "Supercar"
  | "Classic"
  | "Muscle"
  | "Race Car"
  | "SUV / Truck"
  | "Movie / Pop Culture";

export type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "alpha-asc"
  | "alpha-desc"
  | "popularity";

export interface Product {
  id: string;
  slug: string;
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
  description: string;
  collectorNotes: string;
  sku: string;
  image: string;
  images: string[];
  featured: boolean;
  newArrival: boolean;
  popularity: number;
  packagingType: string;
  material: string;
}

export interface CatalogFilters {
  search: string;
  brands: Brand[];
  categories: ProductCategory[];
  scales: Scale[];
  availability: StockStatus[];
  vehicleTypes: VehicleType[];
  minPrice: number;
  maxPrice: number;
  years: string[];
  importedOnly: boolean;
  cardedOnly: boolean;
  hideSoldOut: boolean;
}
