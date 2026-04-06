"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";
import type { Product } from "@/lib/types";

export function ProductRail({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} onQuickView={setSelected} product={product} />
        ))}
      </div>
      <QuickViewModal onClose={() => setSelected(null)} product={selected} />
    </>
  );
}
