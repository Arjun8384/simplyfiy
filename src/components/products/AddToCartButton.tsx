"use client";

import { Product } from "@/types/product";

import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Product;
}

export default function AddToCartButton({
  product,
}: Props) {
  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  return (
    <button
      onClick={() =>
        addItem(product)
      }
      className="rounded-lg bg-blue-900 cursor-pointer px-6 py-3 text-white"
    >
      Add To Cart
    </button>
  );
}