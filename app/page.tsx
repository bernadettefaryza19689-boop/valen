"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { CartSidebar } from "@/components/cart-sidebar";
import { products } from "@/lib/products";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ProductGrid products={filteredProducts} />
      <CartSidebar />
    </main>
  );
}
