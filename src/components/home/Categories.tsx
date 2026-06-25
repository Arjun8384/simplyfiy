import Image from "next/image";
import Link from "next/link";

import { categories }
from "@/data/categories";

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">

          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition">

                <div className="relative h-48">

                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />

                </div>

                <div className="p-4 text-center">

                  <h3 className="font-semibold">
                    {category.name}
                  </h3>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}