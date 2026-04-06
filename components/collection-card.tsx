import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export function CollectionCard({
  title,
  description,
  href,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  badge: string;
}) {
  return (
    <Link
      className="surface-card group flex h-full flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 hover:border-primary/20"
      href={href}
    >
      <div className="space-y-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-sm font-bold text-primary">
          {badge}
        </span>
        <div>
          <h3 className="text-xl font-semibold text-text">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        </div>
      </div>
      <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
        Explore
        <ArrowRightIcon className="h-4 w-4" />
      </div>
    </Link>
  );
}
