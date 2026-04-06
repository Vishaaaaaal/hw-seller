"use client";

import { useState } from "react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <PlaceholderImage
        className="aspect-[0.92] min-h-[24rem]"
        label={active === 0 ? "Display View" : active === 1 ? "Side Profile" : "Packaging"}
        product={product}
      />
      <div className="grid grid-cols-3 gap-3">
        {product.images.map((image, index) => (
          <button
            className={cn(
              "rounded-2xl border bg-white p-2 text-left shadow-soft",
              active === index ? "border-primary" : "border-border",
            )}
            key={image}
            onClick={() => setActive(index)}
            type="button"
          >
            <div className="rounded-[20px] border border-border bg-canvas px-3 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">View {index + 1}</p>
              <p className="mt-2 text-sm text-muted">
                {index === 0 ? "Front display" : index === 1 ? "Side angle" : "Packaging preview"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
