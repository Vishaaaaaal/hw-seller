"use client";

import { useState } from "react";
import { HeartIcon, MinusIcon, PlusIcon, ShareIcon } from "@/components/icons";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductPurchasePanel({
  productId,
  disabled,
}: {
  productId: string;
  disabled: boolean;
}) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const url = window.location.href;

      if (navigator.share) {
        await navigator.share({ title: "Starway Diecast", url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShared(true);
        window.setTimeout(() => setShared(false), 1200);
      }
    } catch {
      // Ignore share cancellation in the demo flow.
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-canvas p-2">
          <button
            className="ring-focus rounded-xl p-2 text-text"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            type="button"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="min-w-8 text-center text-sm font-semibold text-text">{quantity}</span>
          <button className="ring-focus rounded-xl p-2 text-text" onClick={() => setQuantity((current) => current + 1)} type="button">
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <button
          className={cn(
            "ring-focus flex-1 rounded-2xl px-5 py-3 text-sm font-semibold text-white",
            disabled ? "cursor-not-allowed bg-slate-300" : "bg-primary hover:bg-primary-dark",
          )}
          disabled={disabled}
          onClick={() => addToCart(productId, quantity)}
          type="button"
        >
          {disabled ? "Sold out" : "Add to cart"}
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          className={cn(
            "ring-focus inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold",
            isWishlisted(productId) ? "border-primary/30 text-primary" : "border-border text-text",
          )}
          onClick={() => toggleWishlist(productId)}
          type="button"
        >
          <HeartIcon className={cn(isWishlisted(productId) ? "fill-current" : "")} />
          Wishlist
        </button>
        <button
          className="ring-focus inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-text"
          onClick={handleShare}
          type="button"
        >
          <ShareIcon />
          {shared ? "Copied" : "Share"}
        </button>
      </div>
    </div>
  );
}
