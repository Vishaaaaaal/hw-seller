import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="surface-panel mx-auto max-w-2xl p-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text">This casting is not in the catalog</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          The demo route may have changed, or the placeholder product is no longer available.
        </p>
        <Link className="mt-8 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white" href="/shop">
          Return to shop
        </Link>
      </div>
    </Container>
  );
}
