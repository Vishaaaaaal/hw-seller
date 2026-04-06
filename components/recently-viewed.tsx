"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/data/products";
import { ProductRail } from "@/components/product-rail";

const RECENT_KEY = "starway-recently-viewed";

export function RecentlyViewedTracker({ productId }: { productId: string }) {
  useEffect(() => {
    const current = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]") as string[];
    const next = [productId, ...current.filter((item) => item !== productId)].slice(0, 8);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }, [productId]);

  return null;
}

export function RecentlyViewedRail({ currentProductId }: { currentProductId?: string }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]") as string[];
    setIds(stored);
  }, [currentProductId]);

  const viewed = ids
    .filter((id) => id !== currentProductId)
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product))
    .slice(0, 4);

  if (viewed.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-border bg-canvas p-8 text-center text-sm text-muted">
        Recently viewed items will appear here as you open more product pages.
      </div>
    );
  }

  return <ProductRail products={viewed} />;
}
