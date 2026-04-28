"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import { useState } from "react";

interface CheckoutFormData {
  name: string;
  phone: string;
}

export function CartSidebar() {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, total, clearCart } =
    useCartStore();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
  });
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<{
    name: string;
    phone: string;
    items: typeof items;
    total: number;
  } | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Keranjang kosong");
      return;
    }

    if (!formData.name || !formData.phone) {
      alert("Isi nama dan nomor HP");
      return;
    }

    setInvoiceData({
      name: formData.name,
      phone: formData.phone,
      items: [...items],
      total: total(),
    });
    setShowInvoice(true);
    clearCart();
    setFormData({ name: "", phone: "" });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[var(--card)] z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <h2 className="text-lg font-bold">Checkout</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1 hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-4 space-y-3 border-b border-[var(--border)]">
            <input
              type="text"
              placeholder="Nama"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
            <input
              type="tel"
              placeholder="No HP"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-[var(--muted-foreground)] py-8">
                Keranjang kosong
              </p>
            ) : (
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-lg border border-[var(--border)]"
                  >
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[var(--muted)] shrink-0">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-[var(--accent)]">
                        Rp {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="p-1 hover:bg-[var(--muted)] rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="p-1 hover:bg-[var(--muted)] rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--border)] space-y-3">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-[var(--accent)]">Rp {formatPrice(total())}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && invoiceData && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-[var(--card)] rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Invoice</h3>

            <div className="space-y-2 mb-4">
              <p className="font-semibold">{invoiceData.name}</p>
              <p className="text-[var(--muted-foreground)]">{invoiceData.phone}</p>
            </div>

            <hr className="border-[var(--border)] my-3" />

            <ul className="space-y-2 mb-4">
              {invoiceData.items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.qty}
                  </span>
                  <span>Rp {formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>

            <hr className="border-[var(--border)] my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-[var(--accent)]">
                Rp {formatPrice(invoiceData.total)}
              </span>
            </div>

            <button
              onClick={() => setShowInvoice(false)}
              className="mt-6 w-full py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
