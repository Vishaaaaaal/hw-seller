import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Starway Diecast for collector inquiries, pre-orders, restock requests, Instagram support, and WhatsApp-style contact flows.",
};

export default function ContactPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <SectionHeading
        className="mt-6"
        description="Contact flows are framed around collector questions: availability, card condition, pre-orders, imported models, and bundle requests."
        eyebrow="Contact"
        title="Talk to the Starway team"
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <ContactForm />
        <div className="grid gap-6">
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Business email</p>
            <p className="mt-3 text-lg font-semibold text-text">{site.email}</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Instagram</p>
            <p className="mt-3 text-lg font-semibold text-text">{site.instagram}</p>
          </div>
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Quick links</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link className="rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-text" href="/faq">
                FAQ
              </Link>
              <Link className="rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-text" href="/shop?availability=Pre-order">
                Pre-orders
              </Link>
              <Link className="rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-text" href="/shop?availability=Sold+Out">
                Sold out archive
              </Link>
            </div>
          </div>
          <div className="surface-card bg-[linear-gradient(135deg,#2F5BFF,#2146CC)] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">WhatsApp-style CTA</p>
            <p className="mt-3 text-2xl font-semibold">{site.whatsapp}</p>
            <p className="mt-3 text-sm leading-7 text-white/80">
              Use this block as a fast collector inquiry CTA for card condition checks, restock questions, or import sourcing.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
