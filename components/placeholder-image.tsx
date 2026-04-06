import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const brandStyles: Record<string, string> = {
  "Hot Wheels": "from-[#2f5bff] via-[#89a9ff] to-[#d7e2ff]",
  Matchbox: "from-[#F59E0B] via-[#FCD34D] to-[#FEF3C7]",
  Majorette: "from-[#EF4444] via-[#FCA5A5] to-[#FEE2E2]",
  "Mini GT": "from-[#111827] via-[#374151] to-[#CBD5E1]",
  "Pop Race": "from-[#0F766E] via-[#2DD4BF] to-[#CCFBF1]",
  "Tarmac Works": "from-[#111827] via-[#475569] to-[#E2E8F0]",
  "Kaido House": "from-[#7C2D12] via-[#FB923C] to-[#FED7AA]",
};

export function PlaceholderImage({
  product,
  className,
  label,
}: {
  product: Product;
  className?: string;
  label?: string;
}) {
  if (product.image.includes("/")) {
    return (
      <div className={cn("relative overflow-hidden rounded-[28px] bg-canvas border border-white/50 shadow-soft", className)}>
        <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute left-5 top-5 flex gap-2">
          <span className="rounded-full border border-white/60 bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-text shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
          {label ? (
            <span className="rounded-full border border-white/60 bg-text px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white shadow-sm">
              {label}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  const brandGradient = brandStyles[product.brand] ?? "from-slate-800 via-slate-500 to-slate-100";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/50 bg-gradient-to-br shadow-panel",
        brandGradient,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(17,24,39,0.12))]" />
      <div className="absolute left-5 top-5 flex gap-2">
        <span className="rounded-full border border-white/60 bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-text">
          {product.category}
        </span>
        {label ? (
          <span className="rounded-full border border-white/60 bg-text px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
            {label}
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-5 bottom-5 rounded-[24px] border border-white/40 bg-white/18 p-5 backdrop-blur-md">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85">{product.brand}</p>
            <p className="mt-2 max-w-[16rem] font-display text-lg font-bold leading-tight text-white">
              {product.name}
            </p>
          </div>
          <div className="rounded-2xl border border-white/40 bg-white/15 px-3 py-2 text-right text-xs text-white/90">
            <p>{product.scale}</p>
            <p>{product.vehicleType}</p>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-[38%] h-20 w-40 -translate-x-1/2 rounded-[40px] border border-white/45 bg-white/15 shadow-2xl backdrop-blur-sm md:h-24 md:w-48">
        <div className="absolute left-5 top-3 h-10 w-24 rounded-[28px] border border-white/40 bg-white/20" />
        <div className="absolute left-11 top-[-8px] h-8 w-12 rounded-t-[20px] border border-b-0 border-white/35 bg-white/15" />
        <div className="absolute bottom-[-10px] left-6 h-7 w-7 rounded-full border-4 border-white/65 bg-slate-800" />
        <div className="absolute bottom-[-10px] right-6 h-7 w-7 rounded-full border-4 border-white/65 bg-slate-800" />
      </div>
    </div>
  );
}
