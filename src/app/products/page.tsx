import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";



async function getProducts(): Promise<Product[]> {


  const res = await fetch(

    `${process.env.NEXT_PUBLIC_APP_URL}/api/products`,

    {
      cache:"no-store"
    }

  );


  const data = await res.json();


  return data.products || [];

}




export default async function ProductsPage(){


  const products =
  await getProducts();



  return (


    <main className="mx-auto max-w-7xl px-4 py-10">


      <h1 className="mb-8 text-4xl font-bold">

        All Toys

      </h1>



      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">


      {
        products.map(

          (product)=>(

            <ProductCard

              key={product._id}

              product={product}

            />

          )

        )
      }


      </div>


    </main>


  );


}