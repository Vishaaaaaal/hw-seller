import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { faqItems } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common collector questions about authenticity, imports, pre-orders, packaging, sold out restocks, and carded listings.",
};

export default function FAQPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <SectionHeading
        className="mt-6"
        description="Believable storefront FAQs help the demo feel grounded in real collector concerns."
        eyebrow="FAQ"
        title="Frequently asked questions"
      />
      <div className="mt-8 grid gap-4">
        {faqItems.map((item) => (
          <details className="surface-card p-6" key={item.question}>
            <summary className="cursor-pointer list-none text-lg font-semibold text-text">{item.question}</summary>
            <p className="mt-4 text-sm leading-7 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
