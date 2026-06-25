"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartIcon() {
  const count = useCartStore(
    (state) =>
      state.items.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      )
  );

  return (
    <Link
      href="/cart"
      className="relative"
    >
      <ShoppingCart className="h-6 w-6" />

      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  );
}