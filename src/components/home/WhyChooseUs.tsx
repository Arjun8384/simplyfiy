import {
  ShieldCheck,
  Truck,
  Gift
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-20">

      <div className="mx-auto max-w-7xl px-4">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Why Shop With Us
        </h2>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8">
            <ShieldCheck />
            <h3 className="mt-4 text-xl font-semibold">
              Trusted Products
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-8">
            <Truck />
            <h3 className="mt-4 text-xl font-semibold">
              Fast Delivery
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-8">
            <Gift />
            <h3 className="mt-4 text-xl font-semibold">
              Premium Packaging
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}