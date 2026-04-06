import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: "Read the brand story behind Starway Diecast, a collector-led demo storefront built around curation, authenticity, and safe packaging.",
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <SectionHeading
        className="mt-6"
        description="A believable brand story helps clients visualize how a niche diecast storefront can feel polished, credible, and enthusiast-led."
        eyebrow="About Starway"
        title="Built by collectors, structured for serious browsing"
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-panel p-8">
          <p className="text-sm leading-8 text-muted">
            Starway Diecast is imagined as a collector-led store built for enthusiasts who care about authenticity, shelf condition, and finding the right casting without digging through cluttered catalogs. The brand story centers on careful curation across Hot Wheels, Matchbox, Majorette, Mini GT, boutique imports, limited drops, and pre-orders that feel worth waiting for.
          </p>
          <p className="mt-5 text-sm leading-8 text-muted">
            The positioning is simple: trustworthy cataloging, safe packaging, and a clean browsing experience that respects how collectors actually shop. That means clear stock states, carded and uncarded distinctions, easy brand filters, and product storytelling that feels informed rather than generic.
          </p>
        </div>
        <div className="grid gap-6">
          {[
            {
              title: "Authentic curation",
              description: "Catalog lanes are organized by real collector intent: premium, imports, pre-orders, sets, and sold-out archive.",
            },
            {
              title: "Safe packaging",
              description: "The service promise prioritizes card condition, boxed protection, and realistic shipping reassurance.",
            },
            {
              title: "Hard-to-find releases",
              description: "Imported models and boutique brands are treated as core merchandising, not a side note.",
            },
          ].map((item) => (
            <div className="surface-card p-6" key={item.title}>
              <h2 className="text-xl font-semibold text-text">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
