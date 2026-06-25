import { SeedProduct } from "@/types/product";

export const products: SeedProduct[] = [
  {
    productId: "board-game-001",
    name: "Classic Board Game",
    slug: "classic-board-game",
    category: "Board Games",
    price: 615,
    originalPrice: 799,
    images: "/products/board-game.jpg",
    featured: true,
    bestseller: true,
    description:
      "A fun and engaging board game for family and friends. Perfect for game nights and developing strategic thinking.",
  },

  {
    productId: "soft-toy-001",
    name: "Premium Teddy Bear",
    slug: "premium-teddy-bear",
    category: "Soft Toys",
    price: 1399,
    originalPrice: 1699,
    images: "/products/soft-toy.jpg",
    featured: true,
    bestseller: true,
    description:
      "Soft and cuddly teddy bear made with premium plush fabric. A perfect gift for children and loved ones.",
  },

  {
    productId: "toy-001",
    name: "Pyramid Stacking Toy",
    slug: "pyramid-stacking-toy",
    category: "Toys",
    price: 599,
    originalPrice: 749,
    images: "/products/toys.jpg",
    featured: true,
    bestseller: false,
    description:
      "Colorful pyramid stacking toy designed to improve hand-eye coordination and cognitive development.",
  },

  {
    productId: "metal-car-001",
    name: "Off Road Jeep",
    slug: "off-road-jeep",
    category: "Metal Cars",
    price: 1499,
    originalPrice: 1799,
    images: "/products/metal-car.jpg",
    featured: true,
    bestseller: true,
    description:
      "Premium die-cast off-road jeep with realistic detailing and durable metal construction.",
  },

  {
    productId: "rc-car-001",
    name: "Mercedes AMG RC Car",
    slug: "mercedes-amg-rc-car",
    category: "RC Cars",
    price: 3499,
    originalPrice: 3999,
    images: "/products/rc-car.jpg",
    featured: true,
    bestseller: true,
    description:
      "Licensed Mercedes AMG remote-controlled car with smooth steering, responsive controls, and rechargeable battery.",
  },

  {
    productId: "stationery-001",
    name: "Kids Pencil Box",
    slug: "kids-pencil-box",
    category: "Stationery Items",
    price: 278,
    originalPrice: 349,
    images: "/products/stationary-items.jpg",
    featured: false,
    bestseller: true,
    description:
      "Spacious and durable pencil box with multiple compartments for school essentials.",
  },
];