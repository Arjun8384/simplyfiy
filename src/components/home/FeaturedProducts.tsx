import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">

      <div className="mb-10 text-center">

        <h2 className="text-4xl font-bold">
          Featured Products
        </h2>

        <p className="mt-3 text-slate-500">
          Carefully selected toys loved by kids.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}