export default function Newsletter() {
  return (
    <section className="bg-slate-900 py-20 text-white">

      <div className="mx-auto max-w-3xl text-center">

        <h2 className="text-4xl font-bold">
          Stay Updated
        </h2>

        <p className="mt-4">
          New arrivals and special offers.
        </p>

        <input
          placeholder="Enter your email"
          className="mt-8 rounded-xl px-4 py-3 text-black"
        />

      </div>

    </section>
  );
}