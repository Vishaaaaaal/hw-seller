import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link className={cn("inline-flex items-center gap-3", className)} href="/">
      <img src="/images/starway.png" alt="Starway Diecast Logo" className="h-11 w-11 object-contain drop-shadow-sm" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-text">Starway Diecast</span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-muted">Collector Storefront</span>
      </span>
    </Link>
  );
}
