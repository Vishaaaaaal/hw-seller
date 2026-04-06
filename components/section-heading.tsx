import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  cta,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  cta?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-sm leading-7 text-muted sm:text-base">{description}</p> : null}
      </div>
      {href && cta ? (
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          href={href}
        >
          {cta}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
