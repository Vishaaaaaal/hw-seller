"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/data/products";
import { CART_MAX_QTY } from "@/lib/constants";

type CartItem = { productId: string; quantity: number };

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  moveWishlistToCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "starway-cart";
const WISHLIST_KEY = "starway-wishlist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const storedCart = window.localStorage.getItem(CART_KEY);
    const storedWishlist = window.localStorage.getItem(WISHLIST_KEY);

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<StoreContextValue>(() => {
    const addToCart = (productId: string, quantity = 1) => {
      setCart((current) => {
        const existing = current.find((item) => item.productId === productId);
        if (!existing) {
          return [...current, { productId, quantity: Math.min(quantity, CART_MAX_QTY) }];
        }

        const newQuantity = Math.min(existing.quantity + quantity, CART_MAX_QTY);
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item,
        );
      });
    };

    const updateQuantity = (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setCart((current) => current.filter((item) => item.productId !== productId));
        return;
      }

      setCart((current) =>
        current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
      );
    };

    const removeFromCart = (productId: string) => {
      setCart((current) => current.filter((item) => item.productId !== productId));
    };

    const toggleWishlist = (productId: string) => {
      setWishlist((current) =>
        current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
      );
    };

    const removeFromWishlist = (productId: string) => {
      setWishlist((current) => current.filter((id) => id !== productId));
    };

    const moveWishlistToCart = (productId: string) => {
      addToCart(productId, 1);
      removeFromWishlist(productId);
    };

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartSubtotal = cart.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
      cart,
      wishlist,
      addToCart,
      updateQuantity,
      removeFromCart,
      moveWishlistToCart,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted: (productId: string) => wishlist.includes(productId),
      cartCount,
      wishlistCount: wishlist.length,
      cartSubtotal,
    };
  }, [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
