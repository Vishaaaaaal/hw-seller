"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/lib/data/site";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CartIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/container";

function CountBubble({ value }: { value: number }) {
  if (value <= 0) {
    return null;
  }

  return (
    <span className="absolute -right-2 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-white">
      {value}
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlistCount } = useStore();

  return (
    <>
      <div className="border-b border-primary/10 bg-primary text-white">
        <Container className="flex min-h-10 items-center justify-between gap-4 text-xs font-medium tracking-[0.14em]">
          <p className="uppercase">{site.announcement}</p>
          <p className="hidden text-white/80 md:block">Curated diecast for collectors who notice the details.</p>
        </Container>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <Container className="flex h-20 items-center justify-between gap-6">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex h-full">
            {navLinks.map((link) => {
              if (link.label === "Top Brands") {
                return (
                  <div key={link.label} className="group relative flex h-full items-center">
                    <Link
                      className="flex items-center gap-1.5 text-sm font-semibold text-text transition hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                      <svg className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </Link>

                    {/* Invisible bridge to maintain hover state */}
                    <div className="absolute left-0 top-full h-6 w-full" />

                    {/* Dropdown Menu */}
                    <div className="absolute left-[-20px] top-[calc(100%+12px)] z-50 hidden w-[420px] group-hover:block">
                      <div className="overflow-hidden rounded-[24px] bg-white shadow-panel ring-1 ring-border">
                        <div className="grid grid-cols-2 gap-8 p-8">
                          <div>
                            <h4 className="border-b border-border/50 pb-2 text-[11px] font-bold uppercase tracking-widest text-primary">Hot Wheels</h4>
                            <ul className="mt-4 flex flex-col gap-3 text-sm font-medium text-text">
                              <li><Link href="/shop?brand=Hot+Wheels" className="hover:text-primary">All Hot Wheels</Link></li>
                              <li><Link href="/shop?brand=Hot+Wheels&category=Mainline" className="hover:text-primary text-muted hover:text-primary">Mainlines</Link></li>
                              <li><Link href="/shop?brand=Hot+Wheels&category=Silver+Series" className="hover:text-primary text-muted hover:text-primary">Silver Series</Link></li>
                              <li><Link href="/shop?brand=Hot+Wheels&category=Premium" className="hover:text-primary text-muted hover:text-primary">Premium</Link></li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="border-b border-border/50 pb-2 text-[11px] font-bold uppercase tracking-widest text-primary">Mini GT</h4>
                            <ul className="mt-4 flex flex-col gap-3 text-sm font-medium text-text">
                              <li><Link href="/shop?brand=Mini+GT" className="hover:text-primary">All Mini GT</Link></li>
                              <li><Link href="/shop?brand=Mini+GT" className="hover:text-primary text-muted hover:text-primary">Mini GT</Link></li>
                              <li><Link href="/shop?brand=Kaido+House" className="hover:text-primary text-muted hover:text-primary">Kaido House</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  className="flex h-full items-center text-sm font-semibold text-text transition hover:text-primary"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              aria-label="Search catalog"
              className="ring-focus relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-text hover:-translate-y-0.5 hover:border-primary/25 hover:text-primary"
              href="/shop"
            >
              <SearchIcon />
            </Link>
            <Link
              aria-label="Wishlist"
              className="ring-focus relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-text hover:-translate-y-0.5 hover:border-primary/25 hover:text-primary"
              href="/wishlist"
            >
              <HeartIcon />
              <CountBubble value={wishlistCount} />
            </Link>
            <Link
              aria-label="Cart"
              className="ring-focus relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-text hover:-translate-y-0.5 hover:border-primary/25 hover:text-primary"
              href="/cart"
            >
              <CartIcon />
              <CountBubble value={cartCount} />
            </Link>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="ring-focus inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-text lg:hidden"
              onClick={() => setMenuOpen((current) => !current)}
              type="button"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </Container>

        {/* Brand Carousel Tab */}
        <div className="w-full border-t border-border/40 bg-surface/30 py-4">
          <Container>
            <div className="flex items-center justify-center space-x-14 overflow-x-auto no-scrollbar">
              <Link href="/shop?brand=Majorette">
                <img src="/images/majorette-logo.png" alt="Majorette" className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-all grayscale hover:grayscale-0 cursor-pointer" />
              </Link>
              <Link href="/shop?brand=Hot+Wheels">
                <img src="/images/hot-wheels-logo.png" alt="Hot Wheels" className="h-7 w-auto object-contain opacity-60 hover:opacity-100 transition-all grayscale hover:grayscale-0 cursor-pointer" />
              </Link>
              <Link href="/shop?brand=Mini+GT">
                <img src="/images/MINI_GT_logo.svg.png" alt="Mini GT" className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-all grayscale hover:grayscale-0 cursor-pointer" />
              </Link>
              <Link href="/shop?brand=LEGO">
                <img src="/images/lego-logo.png" alt="LEGO" className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-all grayscale hover:grayscale-0 cursor-pointer" />
              </Link>
              <Link href="/shop?brand=Matchbox">
                <img src="/images/Matchbox-logo.png" alt="Matchbox" className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-all grayscale hover:grayscale-0 cursor-pointer" />
              </Link>
            </div>
          </Container>
        </div>

        {menuOpen ? (
          <div className="border-t border-border bg-white lg:hidden">
            <Container className="grid gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-semibold text-text hover:bg-canvas hover:text-primary",
                  )}
                  href={link.href}
                  key={link.label}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </Container>
          </div>
        ) : null}
      </header>
    </>
  );
}
