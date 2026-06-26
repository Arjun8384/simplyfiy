"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";


type Props = {
  product: Product;
};



export default function ProductDetails({
  product,
}: Props) {


  const addToCart =
    useCartStore(
      (state)=>state.addItem
    );


  const addToWishlist =
    useWishlistStore(
      (state)=>state.addWishlist
    );



  return (

    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2">


      {/* Image */}

      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">


        <Image

          src={product.images}

          alt={product.name}

          fill

          className="object-cover"

        />


      </div>




      {/* Details */}

      <div className="flex flex-col justify-center">


        <h1 className="text-4xl font-bold">

          {product.name}

        </h1>



        <p className="mt-4 text-slate-600">

          {product.description}

        </p>




        <div className="mt-6 flex items-center gap-4">


          <span className="text-3xl font-bold">

            ₹{product.price}

          </span>


          {
            product.originalPrice && (

              <span className="text-lg text-slate-400 line-through">

                ₹{product.originalPrice}

              </span>

            )
          }


        </div>




        <div className="mt-8 flex gap-4">


          <button

            onClick={()=>addToCart(product)}

            className="rounded-xl bg-slate-900 px-6 py-3 text-white transition duration-300 hover:scale-105 active:scale-95 hover:bg-slate-700"

          >

            Add to Cart

          </button>



          <button

            onClick={()=>addToWishlist(product)}

            className="rounded-xl border px-6 py-3 hover:bg-slate-100"

          >

            Wishlist

          </button>


        </div>



        <div className="mt-8 rounded-xl bg-slate-50 p-4">


          <p>

            Category: {product.category}

          </p>


          <p>

            Stock: {product.stock ?? "Available"}

          </p>


        </div>


      </div>


    </section>

  );

}