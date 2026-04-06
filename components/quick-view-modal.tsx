"use client";

import Link from "next/link";
import { PlaceholderImage } from "@/components/placeholder-image";
import { CloseIcon, HeartIcon } from "@/components/icons";
import { useStore } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();

  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
      <div className="surface-panel relative grid max-h-[90vh] w-full max-w-4xl overflow-auto lg:grid-cols-[1.05fr_0.95fr]">
        <button
          aria-label="Close quick view"
          className="ring-focus absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white"
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>
        <div className="p-4">
          <PlaceholderImage className="aspect-[0.95]" product={product} />
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{product.brand}</p>
            <h3 className="font-display text-3xl font-bold tracking-tight text-text">{product.name}</h3>
            <div className="flex flex-wrap gap-2 text-xs text-muted">
              <span className="rounded-full bg-canvas px-3 py-1">{product.category}</span>
              <span className="rounded-full bg-canvas px-3 py-1">{product.scale}</span>
              <span className="rounded-full bg-canvas px-3 py-1">{product.series}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-text">{formatPrice(product.price)}</p>
            <p className="text-sm leading-7 text-muted">{product.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-canvas p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Release</p>
              <p className="mt-2 font-semibold text-text">
                {product.releaseYear} / {product.wave}
              </p>
            </div>
            <div className="rounded-2xl bg-canvas p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Packaging</p>
              <p className="mt-2 font-semibold text-text">{product.packagingType}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="ring-focus rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
              onClick={() => addToCart(product.id, 1)}
              type="button"
            >
              Add to Cart
            </button>
            <button
              className={cn(
                "ring-focus inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-semibold",
                isWishlisted(product.id) ? "border-primary/30 text-primary" : "text-text",
              )}
              onClick={() => toggleWishlist(product.id)}
              type="button"
            >
              <HeartIcon className={cn(isWishlisted(product.id) ? "fill-current" : "")} />
              Wishlist
            </button>
            <Link
              className="ring-focus rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-text"
              href={`/products/${product.slug}`}
            >
              Open details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
