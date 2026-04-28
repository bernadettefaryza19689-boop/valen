"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  return (
    <div className="bg-[var(--card)] rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-[var(--muted)]">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      <h3 className="mt-3 font-semibold text-sm line-clamp-1">{product.name}</h3>

      <p className="mt-1 font-bold text-[var(--accent)]">
        Rp {formatPrice(product.price)}
      </p>

      <button
        onClick={() => addItem(product)}
        className="mt-3 w-full py-2 text-sm font-medium bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
      >
        Tambah
      </button>
    </div>
  );
}
