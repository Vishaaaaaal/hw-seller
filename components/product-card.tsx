"use client";

import Link from "next/link";
import { useState } from "react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { HeartIcon, SearchIcon } from "@/components/icons";
import { useStore } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import { CART_MAX_QTY } from "@/lib/constants";
import type { Product } from "@/lib/types";

function StatusPill({ product }: { product: Product }) {
  const tone =
    product.stockStatus === "In Stock"
      ? "bg-success/10 text-success"
      : product.stockStatus === "Pre-order"
        ? "bg-warning/10 text-warning"
        : "bg-danger/10 text-danger";

  return (
    <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", tone)}>{product.stockStatus}</span>
  );
}

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { cart, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [added, setAdded] = useState(false);

  const existingItem = cart.find(i => i.productId === product.id);
  const reachedLimit = existingItem ? existingItem.quantity >= CART_MAX_QTY : false;

  const handleAdd = () => {
    if (reachedLimit) return;
    addToCart(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <article className={cn("group surface-card overflow-hidden", product.stockStatus === "Sold Out" && "opacity-60 grayscale-[0.3]")}>
      <div className="relative p-3">
        <Link href={`/products/${product.slug}`}>
          <PlaceholderImage
            className="aspect-[0.88] transition duration-300 group-hover:-translate-y-1"
            label={product.newArrival ? "New Arrival" : product.imported ? "Imported" : undefined}
            product={product}
          />
        </Link>
        <button
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "ring-focus absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/85 shadow-soft",
            wishlisted ? "text-primary" : "text-text",
          )}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <HeartIcon className={cn(wishlisted ? "fill-current" : "")} />
        </button>
        {onQuickView && (
          <button
            aria-label="Quick view"
            className="ring-focus absolute left-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/85 shadow-soft text-text opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onQuickView(product)}
            type="button"
          >
            <SearchIcon />
          </button>
        )}
      </div>
      <div className="space-y-4 px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{product.brand}</p>
            <Link href={`/products/${product.slug}`}>
              <h3 className="mt-2 text-lg font-semibold leading-tight text-text">{product.name}</h3>
            </Link>
          </div>
          <StatusPill product={product} />
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          <span className="rounded-full bg-canvas px-3 py-1">{product.category}</span>
          <span className="rounded-full bg-canvas px-3 py-1">{product.scale}</span>
          <span className="rounded-full bg-canvas px-3 py-1">{product.vehicleType}</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-text">{formatPrice(product.price)}</p>
            {product.originalPrice ? (
              <p className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              className={cn(
                "ring-focus rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all",
                added ? "bg-success" : reachedLimit ? "bg-slate-400 cursor-not-allowed text-white/90" : "bg-primary hover:bg-primary-dark hover:scale-[1.02]",
              )}
              disabled={product.stockStatus === "Sold Out" || reachedLimit}
              onClick={handleAdd}
              type="button"
              title={reachedLimit ? `Max ${CART_MAX_QTY} per customer` : undefined}
            >
              {product.stockStatus === "Sold Out" ? "Sold Out" : reachedLimit ? "Limit Reached" : added ? "Added ✓" : "Add to Cart"}
            </button>
            {added && (
              <Link href="/cart" className="text-xs font-medium text-primary hover:underline">
                View Cart →
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
