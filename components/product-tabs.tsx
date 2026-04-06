"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const tabs = ["Description", "Specifications", "Collector notes", "Shipping & packaging"] as const;

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Description");

  const content = {
    Description: product.description,
    Specifications: `Scale: ${product.scale}. Material: ${product.material}. Series: ${product.series}. Release year: ${product.releaseYear}. SKU: ${product.sku}. Packaging: ${product.packagingType}.`,
    "Collector notes": product.collectorNotes,
    "Shipping & packaging":
      "Packed with collector condition in mind. Carded pieces are bagged and reinforced, while boxed models are wrapped and cushioned to reduce transit damage risk.",
  };

  return (
    <div className="surface-card p-4 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            className={cn(
              "ring-focus rounded-2xl px-4 py-3 text-sm font-semibold",
              tab === active ? "bg-primary text-white" : "bg-canvas text-text",
            )}
            key={tab}
            onClick={() => setActive(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-[24px] bg-canvas p-5 text-sm leading-7 text-muted sm:text-base">
        {content[active]}
      </div>
    </div>
  );
}
