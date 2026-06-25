"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/banners/banner-1.png",
    title: "Premium Toys Collection",
    subtitle: "Play • Learn • Grow",
  },
  {
    image: "/banners/banner-2.jpg",
    title: "School things",
    subtitle: "Learning and Fun",
  },
  {
    image: "/banners/banner-3.jpg",
    title: "Board Games Festival",
    subtitle: "User offline, It's family time!",
  },
  {
    image: "/banners/banner-4.jpg",
    title: "Toy Store",
    subtitle: "Kids' playtime",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setCurrent((prev) =>
          prev === slides.length - 1
            ? 0
            : prev + 1
        );
      }, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[550px] overflow-hidden">

      <Image
        src={slides[current].image}
        alt={slides[current].title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center">

        <div className="mx-auto max-w-7xl px-6 text-white">

          {/* <h1 className="text-6xl font-bold">
            {slides[current].title}
          </h1>

          <p className="mt-4 text-xl">
            {slides[current].subtitle}
          </p> */}

          <Link
href="/products"
className="inline-block rounded-xl bg-blue-900 px-8 py-3 text-white hover:bg-blue-800 transition"
>
Shop Now
</Link>

        </div>
      </div>
    </section>
  );
}