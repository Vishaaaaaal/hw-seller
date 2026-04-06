import Link from "next/link";
import { collectionCards, navLinks, site } from "@/lib/data/site";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-[#F2F5FB]">
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-md text-sm leading-7 text-muted">
            Starway Diecast is a premium demo storefront concept for collector-first diecast retail across
            Hot Wheels, Mini GT, Matchbox, Majorette, boutique imports, and limited drops.
          </p>
          <div className="rounded-3xl border border-border bg-white p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Newsletter</p>
            <div className="mt-3 flex gap-2">
              <input
                className="ring-focus min-w-0 flex-1 rounded-2xl border border-border bg-canvas px-4 py-3 text-sm"
                placeholder="Collector email"
                type="email"
              />
              <button className="ring-focus rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark">
                Join
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">Shop</p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {collectionCards.slice(0, 6).map((collection) => (
              <Link href={collection.href} key={collection.name}>
                {collection.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">Info</p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">Support</p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            <p>{site.email}</p>
            <p>{site.instagram}</p>
            <p>{site.whatsapp}</p>
            <p>Mon-Sat, 10:00 AM to 7:00 PM IST</p>
          </div>
        </div>
      </Container>
      <Container className="border-t border-border py-6 text-xs uppercase tracking-[0.18em] text-muted">
        Starway Diecast Demo on {site.domain}
      </Container>
    </footer>
  );
}
