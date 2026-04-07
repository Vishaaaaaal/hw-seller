import { products } from "@/lib/data/products";
import type { Brand, CatalogFilters, Product, ProductCategory, Scale, SortOption, StockStatus, VehicleType } from "@/lib/types";

export const allBrands: Brand[] = [
  "Hot Wheels",
  "Matchbox",
  "Majorette",
  "Mini GT",
  "Pop Race",
  "Tarmac Works",
  "Kaido House",
];

export const allCategories: ProductCategory[] = [
  "Premium",
  "Silver Series",
  "Mainline",
  "Imported",
  "Collector Set",
  "Team Transport",
  "Boulevard",
  "Pop Culture",
  "Pre-order",
  "Limited Edition",
];

export const allScales: Scale[] = ["1:64", "1:43", "1:24"];
export const allAvailability: StockStatus[] = ["In Stock", "Sold Out", "Pre-order"];
export const allVehicleTypes: VehicleType[] = [
  "JDM",
  "Supercar",
  "Classic",
  "Muscle",
  "Race Car",
  "SUV / Truck",
  "Movie / Pop Culture",
];

export const yearOptions = Array.from(new Set(products.map((product) => String(product.releaseYear)))).sort((a, b) => Number(b) - Number(a));

export const priceBounds = products.reduce(
  (acc, product) => ({
    min: Math.min(acc.min, product.price),
    max: Math.max(acc.max, product.price),
  }),
  { min: Infinity, max: 0 },
);

export const defaultFilters: CatalogFilters = {
  search: "",
  brands: [],
  categories: [],
  scales: [],
  availability: [],
  vehicleTypes: [],
  minPrice: priceBounds.min,
  maxPrice: priceBounds.max,
  years: [],
  importedOnly: false,
  cardedOnly: false,
  hideSoldOut: false,
};

export function parseFilters(searchParams: URLSearchParams): CatalogFilters {
  const minPrice = Number(searchParams.get("minPrice") ?? priceBounds.min);
  const maxPrice = Number(searchParams.get("maxPrice") ?? priceBounds.max);

  return {
    search: searchParams.get("q") ?? "",
    brands: searchParams.getAll("brand") as Brand[],
    categories: searchParams.getAll("category") as ProductCategory[],
    scales: searchParams.getAll("scale") as Scale[],
    availability: searchParams.getAll("availability") as StockStatus[],
    vehicleTypes: searchParams.getAll("vehicle") as VehicleType[],
    years: searchParams.getAll("year"),
    minPrice: Number.isFinite(minPrice) ? minPrice : priceBounds.min,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : priceBounds.max,
    importedOnly: searchParams.get("imported") === "1",
    cardedOnly: searchParams.get("carded") === "1",
    hideSoldOut: searchParams.get("hideSoldOut") === "1",
  };
}

export function getSort(searchParams: URLSearchParams): SortOption {
  const sort = searchParams.get("sort") as SortOption | null;
  return sort ?? "featured";
}

export function filterProducts(items: Product[], filters: CatalogFilters) {
  return items.filter((product) => {
    const matchesSearch =
      filters.search.length === 0 ||
      `${product.name} ${product.brand} ${product.category} ${product.subcategory}`
        .toLowerCase()
        .includes(filters.search.toLowerCase());
    const matchesBrands = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const matchesCategories = filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesScales = filters.scales.length === 0 || filters.scales.includes(product.scale);
    const matchesAvailability =
      filters.availability.length === 0 || filters.availability.includes(product.stockStatus);
    const matchesVehicleTypes =
      filters.vehicleTypes.length === 0 || filters.vehicleTypes.includes(product.vehicleType);
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const matchesYears = filters.years.length === 0 || filters.years.includes(String(product.releaseYear));
    const matchesImported = !filters.importedOnly || product.imported;
    const matchesCarded = !filters.cardedOnly || product.carded;
    const matchesHideSoldOut = !filters.hideSoldOut || product.stockStatus !== "Sold Out";

    return (
      matchesSearch &&
      matchesBrands &&
      matchesCategories &&
      matchesScales &&
      matchesAvailability &&
      matchesVehicleTypes &&
      matchesPrice &&
      matchesYears &&
      matchesImported &&
      matchesCarded &&
      matchesHideSoldOut
    );
  });
}

export function sortProducts(items: Product[], sort: SortOption) {
  const clone = [...items];

  switch (sort) {
    case "newest":
      return clone.sort((a, b) => b.releaseYear - a.releaseYear || b.popularity - a.popularity);
    case "price-low":
      return clone.sort((a, b) => a.price - b.price);
    case "price-high":
      return clone.sort((a, b) => b.price - a.price);
    case "alpha-asc":
      return clone.sort((a, b) => a.name.localeCompare(b.name));
    case "alpha-desc":
      return clone.sort((a, b) => b.name.localeCompare(a.name));
    case "popularity":
      return clone.sort((a, b) => b.popularity - a.popularity);
    case "featured":
    default:
      return clone.sort((a, b) => Number(b.featured) - Number(a.featured) || b.popularity - a.popularity);
  }
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const aScore =
        Number(a.brand === product.brand) * 3 +
        Number(a.category === product.category) * 2 +
        Number(a.vehicleType === product.vehicleType);
      const bScore =
        Number(b.brand === product.brand) * 3 +
        Number(b.category === product.category) * 2 +
        Number(b.vehicleType === product.vehicleType);

      return bScore - aScore || b.popularity - a.popularity;
    })
    .slice(0, 4);
}
