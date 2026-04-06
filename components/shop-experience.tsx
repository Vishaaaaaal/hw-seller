"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { allAvailability, allBrands, allCategories, allScales, allVehicleTypes, filterProducts, getSort, parseFilters, priceBounds, sortProducts, yearOptions } from "@/lib/catalog";
import { products } from "@/lib/data/products";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { FilterIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { AddProductModal } from "@/components/add-product-modal";
import { SectionHeading } from "@/components/section-heading";
import { cn, formatPrice } from "@/lib/utils";
import type { Product, SortOption } from "@/lib/types";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "alpha-asc", label: "Alphabetical A-Z" },
  { value: "alpha-desc", label: "Alphabetical Z-A" },
  { value: "popularity", label: "Popularity" },
];

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-border bg-canvas p-4">
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-muted">
      <span>{label}</span>
      <input checked={checked} className="h-4 w-4 rounded border-border text-primary" onChange={onChange} type="checkbox" />
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium",
        checked ? "border-primary bg-primary/5 text-primary" : "border-border bg-white text-text",
      )}
      onClick={onChange}
      type="button"
    >
      {label}
      <span
        className={cn(
          "inline-flex h-6 w-11 items-center rounded-full p-1",
          checked ? "bg-primary" : "bg-silver",
        )}
      >
        <span className={cn("h-4 w-4 rounded-full bg-white", checked ? "translate-x-5" : "translate-x-0")} />
      </span>
    </button>
  );
}

function FiltersPanel({
  className,
  params,
  closeMobile,
}: {
  className?: string;
  params: URLSearchParams;
  closeMobile?: () => void;
}) {
  const router = useRouter();
  const filters = parseFilters(params);

  const updateParams = (next: URLSearchParams) => {
    const query = next.toString();
    router.replace(query ? `/shop?${query}` : "/shop", { scroll: false });
  };

  const toggleValue = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    const all = next.getAll(key);
    next.delete(key);

    if (all.includes(value)) {
      all.filter((item) => item !== value).forEach((item) => next.append(key, item));
    } else {
      [...all, value].forEach((item) => next.append(key, item));
    }

    updateParams(next);
  };

  const toggleBoolean = (key: string) => {
    const next = new URLSearchParams(params.toString());
    next.set(key, next.get(key) === "1" ? "0" : "1");
    if (next.get(key) === "0") {
      next.delete(key);
    }
    updateParams(next);
  };

  const updatePrice = (key: "minPrice" | "maxPrice", value: number) => {
    const next = new URLSearchParams(params.toString());
    next.set(key, String(value));
    updateParams(next);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-text">Filters</p>
        <button className="text-sm text-primary" onClick={() => updateParams(new URLSearchParams())} type="button">
          Clear all
        </button>
      </div>
      <FilterBlock title="Brand">
        {allBrands.map((brand) => (
          <Checkbox
            checked={filters.brands.includes(brand)}
            key={brand}
            label={brand}
            onChange={() => toggleValue("brand", brand)}
          />
        ))}
      </FilterBlock>
      <FilterBlock title="Category">
        {allCategories.map((category) => (
          <Checkbox
            checked={filters.categories.includes(category)}
            key={category}
            label={category}
            onChange={() => toggleValue("category", category)}
          />
        ))}
      </FilterBlock>
      <FilterBlock title="Scale">
        {allScales.map((scale) => (
          <Checkbox
            checked={filters.scales.includes(scale)}
            key={scale}
            label={scale}
            onChange={() => toggleValue("scale", scale)}
          />
        ))}
      </FilterBlock>
      <FilterBlock title="Availability">
        {allAvailability.map((status) => (
          <Checkbox
            checked={filters.availability.includes(status)}
            key={status}
            label={status}
            onChange={() => toggleValue("availability", status)}
          />
        ))}
      </FilterBlock>
      <FilterBlock title="Vehicle type">
        {allVehicleTypes.map((vehicle) => (
          <Checkbox
            checked={filters.vehicleTypes.includes(vehicle)}
            key={vehicle}
            label={vehicle}
            onChange={() => toggleValue("vehicle", vehicle)}
          />
        ))}
      </FilterBlock>
      <FilterBlock title="Price range">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted">
            <span>{formatPrice(filters.minPrice)}</span>
            <span>{formatPrice(filters.maxPrice)}</span>
          </div>
          <input
            className="w-full accent-primary"
            max={Math.min(filters.maxPrice, priceBounds.max)}
            min={priceBounds.min}
            onChange={(event) => updatePrice("minPrice", Math.min(Number(event.target.value), filters.maxPrice))}
            type="range"
            value={filters.minPrice}
          />
          <input
            className="w-full accent-primary"
            max={priceBounds.max}
            min={Math.max(filters.minPrice, priceBounds.min)}
            onChange={(event) => updatePrice("maxPrice", Math.max(Number(event.target.value), filters.minPrice))}
            type="range"
            value={filters.maxPrice}
          />
        </div>
      </FilterBlock>
      <FilterBlock title="Year / release wave">
        {yearOptions.map((year) => (
          <Checkbox
            checked={filters.years.includes(year)}
            key={year}
            label={year}
            onChange={() => toggleValue("year", year)}
          />
        ))}
      </FilterBlock>
      <FilterBlock title="Collector toggles">
        <Toggle checked={filters.importedOnly} label="Imported only" onChange={() => toggleBoolean("imported")} />
        <Toggle checked={filters.cardedOnly} label="Carded only" onChange={() => toggleBoolean("carded")} />
      </FilterBlock>
      {closeMobile ? (
        <button
          className="ring-focus w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white"
          onClick={closeMobile}
          type="button"
        >
          View results
        </button>
      ) : null}
    </div>
  );
}

export function ShopExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const filters = useMemo(() => parseFilters(params), [params]);
  const sort = useMemo(() => getSort(params), [params]);
  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [visibleCount, setVisibleCount] = useState(12);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    setSearchDraft(filters.search);
    setVisibleCount(12);
  }, [searchParams]);

  const results = useMemo(() => sortProducts(filterProducts(products, filters), sort), [filters, sort]);
  const visibleProducts = results.slice(0, visibleCount);

  const activeChips = [
    ...filters.brands.map((item) => ({ key: "brand", value: item, label: item })),
    ...filters.categories.map((item) => ({ key: "category", value: item, label: item })),
    ...filters.scales.map((item) => ({ key: "scale", value: item, label: item })),
    ...filters.availability.map((item) => ({ key: "availability", value: item, label: item })),
    ...filters.vehicleTypes.map((item) => ({ key: "vehicle", value: item, label: item })),
    ...filters.years.map((item) => ({ key: "year", value: item, label: item })),
    ...(filters.importedOnly ? [{ key: "imported", value: "1", label: "Imported only" }] : []),
    ...(filters.cardedOnly ? [{ key: "carded", value: "1", label: "Carded only" }] : []),
    ...(filters.search ? [{ key: "q", value: filters.search, label: `Search: ${filters.search}` }] : []),
  ];

  const updateParams = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const query = next.toString();
    router.replace(query ? `/shop?${query}` : "/shop", { scroll: false });
  };

  return (
    <Container className="py-10 sm:py-12">
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
        <SectionHeading
          description="Search, filter, and sort a collector-focused demo catalog spanning mainlines, premium assortments, boutique imports, and pre-orders."
          eyebrow="Catalog"
          title="Shop the Starway collection"
        />
        <div className="surface-panel overflow-hidden">
          <div className="grid gap-8 p-5 lg:grid-cols-[300px_1fr] lg:p-6">
            <aside className="hidden lg:block">
              <FiltersPanel params={params} />
            </aside>
            <div className="space-y-6">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-1 flex-col gap-3 md:flex-row">
                  <form
                    className="flex flex-1 gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      updateParams((next) => {
                        if (searchDraft) {
                          next.set("q", searchDraft);
                        } else {
                          next.delete("q");
                        }
                      });
                    }}
                  >
                    <input
                      className="ring-focus min-w-0 flex-1 rounded-2xl border border-border bg-canvas px-4 py-3 text-sm"
                      onChange={(event) => setSearchDraft(event.target.value)}
                      placeholder="Search by name, brand, or series"
                      value={searchDraft}
                    />
                    <button className="ring-focus rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark" type="submit">
                      Search
                    </button>
                  </form>
                  <button
                    className="ring-focus inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-text lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                    type="button"
                  >
                    <FilterIcon className="h-4 w-4" />
                    Filters
                  </button>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <p className="text-sm text-muted">{results.length} products</p>
                  <select
                    className="ring-focus rounded-2xl border border-border bg-canvas px-4 py-3 text-sm"
                    onChange={(event) =>
                      updateParams((next) => {
                        next.set("sort", event.target.value);
                      })
                    }
                    value={sort}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setAddModalOpen(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#0A0D14] px-5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-primary"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Listing
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeChips.length > 0 ? (
                  activeChips.map((chip) => (
                    <button
                      className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                      key={`${chip.key}-${chip.value}`}
                      onClick={() =>
                        updateParams((next) => {
                          if (chip.key === "imported" || chip.key === "carded" || chip.key === "q") {
                            next.delete(chip.key);
                            return;
                          }
                          const values = next.getAll(chip.key).filter((item) => item !== chip.value);
                          next.delete(chip.key);
                          values.forEach((item) => next.append(chip.key, item));
                        })
                      }
                      type="button"
                    >
                      {chip.label} x
                    </button>
                  ))
                ) : (
                  <div className="rounded-full bg-canvas px-4 py-2 text-sm text-muted">
                    No filters applied. Browse the full demo catalog.
                  </div>
                )}
              </div>
              {visibleProducts.length > 0 ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {results.length > visibleCount ? (
                    <div className="flex justify-center">
                      <button
                        className="ring-focus rounded-2xl border border-border bg-white px-6 py-3 text-sm font-semibold text-text hover:border-primary/20 hover:text-primary"
                        onClick={() => setVisibleCount((count) => count + 12)}
                        type="button"
                      >
                        Load more
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="rounded-[28px] border border-dashed border-border bg-canvas p-10 text-center">
                  <p className="text-lg font-semibold text-text">No products match the current filters.</p>
                  <p className="mt-2 text-sm text-muted">Try clearing a few chips or widening the price range.</p>
                  <button
                    className="ring-focus mt-6 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white"
                    onClick={() => router.replace("/shop")}
                    type="button"
                  >
                    Reset catalog
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/30 lg:hidden">
          <div className="ml-auto h-full w-full max-w-sm overflow-auto bg-white p-5 shadow-2xl">
            <FiltersPanel closeMobile={() => setMobileFiltersOpen(false)} params={params} />
          </div>
        </div>
      ) : null}

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
    </Container>
  );
}
