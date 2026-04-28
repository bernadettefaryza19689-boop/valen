"use client";

import { ShoppingCart, Search } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const { toggleCart, itemCount } = useCartStore();

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between gap-4 px-4 py-3 bg-[var(--card)] border-b border-[var(--border)] shadow-sm">
      <h1 className="text-lg font-bold whitespace-nowrap">MinimalStore Pro</h1>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari produk..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-shadow"
        />
      </div>

      <button
        onClick={toggleCart}
        className="relative flex items-center gap-2 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
      >
        <ShoppingCart className="w-5 h-5" />
        {itemCount() > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
            {itemCount()}
          </span>
        )}
      </button>
    </nav>
  );
}
