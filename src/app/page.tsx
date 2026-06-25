import HeroCarousel from "@/components/home/HeroCarousel";
import Categories from "@/components/home/Categories";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";



async function getProducts():Promise<Product[]> {


const res =
await fetch(
`${process.env.NEXT_PUBLIC_APP_URL}/api/products`,
{
cache:"no-store"
}
);


const data =
await res.json();

return data.products || [];

}



export default async function Home(){


const products =
await getProducts();



return (

<main>

<HeroCarousel />

<Categories />


<section className="mx-auto max-w-7xl px-4 py-12">


<h2 className="mb-8 text-3xl font-bold">
Featured Toys
</h2>



<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


{
products
.filter(
(product)=>
product.featured
)
.map(
(product)=>(

<ProductCard

key={product._id}

product={product}

/>

))

}


</div>


</section>


</main>

)

}