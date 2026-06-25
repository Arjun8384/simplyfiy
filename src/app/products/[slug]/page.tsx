import ProductDetails from "@/components/products/ProductDetails";
import { Product } from "@/types/product";


type Props = {
  params: Promise<{
    slug:string;
  }>;
};


async function getProducts(): Promise<Product[]> {


  const res = await fetch(
    "http://localhost:3000/api/products",
    {
      cache:"no-store"
    }
  );


  const data = await res.json();


  return data.products || [];

}




export default async function ProductPage(
 {params}:Props
){


const {slug}=await params;


const products =
await getProducts();



const product =
products.find(
(item)=>
item.slug===slug
);



if(!product){

return (

<div className="p-10">

Product not found

</div>

);

}



return (

<ProductDetails

product={product}

/>

);

}