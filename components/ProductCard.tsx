import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={product.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row gap-5 rounded-xl bg-surface border border-line p-5 md:p-6 hover:border-accent transition-colors">
      <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0 rounded-lg overflow-hidden bg-[#161618]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center min-w-0">
        <span className="inline-block w-fit text-[10px] font-mono uppercase tracking-wide text-accent bg-accent/10 px-2 py-0.5 rounded mb-2">
          {product.price}
        </span>
        <h3 className="font-bold text-base md:text-lg text-foreground mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-mute font-mono mb-2">{product.tagline}</p>
        <p className="text-sm text-mute leading-relaxed mb-3 line-clamp-3">
          {product.description}
        </p>
        <span className="text-sm font-semibold text-accent group-hover:opacity-80 transition">
          Get it on Gumroad &rarr;
        </span>
      </div>
    </Link>
  );
}
