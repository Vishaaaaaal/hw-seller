"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { PlaceholderImage } from "@/components/placeholder-image";
import { products } from "@/lib/data/products";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function WishlistView() {
  const { wishlist, moveWishlistToCart, removeFromWishlist } = useStore();
  const items = wishlist
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  if (items.length === 0) {
    return (
      <Container className="py-12">
        <div className="surface-panel mx-auto max-w-3xl p-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Wishlist</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text">No saved castings yet</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">
            Wishlist is useful for client demos because it shows intent-heavy browsing, save-for-later behavior, and cross-session product discovery.
          </p>
          <Link className="mt-8 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white" href="/shop">
            Browse catalog
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <div className="surface-card overflow-hidden" key={product.id}>
            <div className="p-3">
              <PlaceholderImage className="aspect-[0.95]" product={product} />
            </div>
            <div className="space-y-4 px-5 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{product.brand}</p>
                <h2 className="mt-2 text-xl font-semibold text-text">{product.name}</h2>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-text">{formatPrice(product.price)}</p>
                <span className="rounded-full bg-canvas px-3 py-1 text-xs text-muted">{product.stockStatus}</span>
              </div>
              <div className="flex gap-3">
                <button className="ring-focus flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white" onClick={() => moveWishlistToCart(product.id)} type="button">
                  Move to cart
                </button>
                <button className="ring-focus rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-text" onClick={() => removeFromWishlist(product.id)} type="button">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
