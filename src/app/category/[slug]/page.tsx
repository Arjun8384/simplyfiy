import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};


async function getProducts(): Promise<Product[]> {

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";


  const res = await fetch(
    `${baseUrl}/api/products`,
    {
      cache: "no-store",
    }
  );


  if(!res.ok){
    throw new Error("Failed to fetch products");
  }


  const data = await res.json();

  return data.products || [];

}



export default async function CategoryPage(
  { params }: Props
){


  const { slug } = await params;


  const products =
    await getProducts();



  const filteredProducts = products.filter((product)=>{

    const categorySlug = product.category
    .toLowerCase()
    .replaceAll(" ","-");

    return (
    categorySlug === slug ||
    categorySlug.replace("stationery","stationary") === slug
    );

    });




  return (

    <section className="mx-auto max-w-7xl px-4 py-10">


      <h1 className="text-4xl font-bold capitalize">

        {slug.replaceAll("-", " ")}

      </h1>



      {
        filteredProducts.length === 0 ? (

          <p className="mt-10 text-slate-500">

            No products found in this category.

          </p>

        ) : (


          <div className="mt-8 grid gap-6 md:grid-cols-3">


            {
              filteredProducts.map(
                (product)=>(

                  <ProductCard

                    key={product._id}

                    product={product}

                  />

                )

              )

            }


          </div>


        )

      }


    </section>

  );

}