"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { PlaceholderImage } from "@/components/placeholder-image";
import { products } from "@/lib/data/products";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartView() {
  const { cart, cartSubtotal, removeFromCart, updateQuantity } = useStore();
  const items = cart
    .map((entry) => ({
      ...entry,
      product: products.find((product) => product.id === entry.productId),
    }))
    .filter((entry): entry is typeof entry & { product: (typeof products)[number] } => Boolean(entry.product));

  if (items.length === 0) {
    return (
      <Container className="py-12">
        <div className="surface-panel mx-auto max-w-3xl p-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Cart</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text">Your collector cart is empty</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">
            Save a few standout castings, bundle a transport set, or add a pre-order to show how the checkout flow could feel in a production build.
          </p>
          <Link className="mt-8 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white" href="/shop">
            Continue shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.85fr]">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div className="surface-card grid gap-5 p-4 sm:grid-cols-[220px_1fr]" key={product.id}>
              <PlaceholderImage className="aspect-[1]" product={product} />
              <div className="flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{product.brand}</p>
                  <h2 className="mt-2 text-xl font-semibold text-text">{product.name}</h2>
                  <p className="mt-2 text-sm text-muted">
                    {product.category} / {product.scale} / {product.packagingType}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-canvas px-3 py-2">
                    <button className="ring-focus rounded-xl p-2 text-text" onClick={() => updateQuantity(product.id, quantity - 1)} type="button">
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold text-text">{quantity}</span>
                    <button className="ring-focus rounded-xl p-2 text-text" onClick={() => updateQuantity(product.id, quantity + 1)} type="button">
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-text">{formatPrice(product.price * quantity)}</p>
                    <button className="mt-1 text-sm text-danger" onClick={() => removeFromCart(product.id)} type="button">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="surface-card h-fit p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Order summary</p>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="rounded-2xl bg-canvas p-4 text-muted">
              Demo checkout only. Replace this summary with shipping rules, taxes, coupon logic, and payment integration later.
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold text-text">
              <span>Total</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            <button className="w-full cursor-not-allowed rounded-2xl bg-slate-300 px-5 py-3 text-sm font-semibold text-white" disabled type="button">
              Checkout disabled in demo
            </button>
          </div>
        </aside>
      </div>
    </Container>
  );
}
