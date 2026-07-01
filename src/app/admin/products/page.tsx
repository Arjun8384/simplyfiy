"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


interface Product {

  _id:string;
  productId:string;
  name:string;
  slug:string;
  category:string;
  price:number;
  originalPrice:number;
  images:string;
  description:string;
  stock:number;
  featured:boolean;
  bestseller:boolean;

}



interface ProductForm{

name:string;

category:string;

price:string;

originalPrice:string;

images:string;

description:string;

stock:string;

featured:boolean;

bestseller:boolean;

}



const emptyForm:ProductForm={

name:"",

category:"",

price:"",

originalPrice:"",

images:"",

description:"",

stock:"",

featured:false,

bestseller:false

};



export default function ProductsPage(){



const [products,setProducts]=useState<Product[]>([]);


const [form,setForm]=useState<ProductForm>(
emptyForm
);


const [editing,setEditing]=useState<string|null>(
null
);

const [selectedImage, setSelectedImage] = useState<File | null>(null);




// reusable fetch function for CRUD actions

async function loadProducts(){


try{


const res =
await fetch(
"/api/products",
{
cache:"no-store"
}
);



const data =
await res.json();



if(data.success){

setProducts(
data.products
);

}



}

catch(error){

console.log(
"PRODUCT LOAD ERROR",
error
);

}


}






// initial page loading
useEffect(()=>{


let active=true;



fetch(
"/api/products",
{
cache:"no-store"
}
)

.then(res=>res.json())

.then(data=>{


if(
active &&
data.success
){

setProducts(
data.products
);

}


})

.catch(console.log);



return()=>{

active=false;

};



},[]);







function handleChange(
e:React.ChangeEvent<
HTMLInputElement | HTMLTextAreaElement
>
){


const {
name,
value
}=e.target;



setForm({

...form,


[name]:

name==="price" ||
name==="originalPrice" ||
name==="stock"

?

Number(value)

:

value


});


}


async function saveProduct(){


let imageUrl =
form.images;



if(selectedImage){


const uploadData =
new FormData();



uploadData.append(
"image",
selectedImage
);



const uploadRes =
await fetch(
"/api/upload",
{

method:"POST",

body:uploadData

}

);



const uploadResult =
await uploadRes.json();



if(!uploadResult.success){
    console.log(uploadResult);

alert(uploadResult.message || "Image upload failed");

return;

}



imageUrl =
uploadResult.url;


}




const url =
editing

?

`/api/products/${editing}`

:

"/api/products";



const method =
editing

?

"PATCH"

:

"POST";

let slug = form.name
.toLowerCase()
.trim()
.replace(/\s+/g,"-");


let productId =
slug + "-" + Date.now();


// keep existing values during edit
if(editing){

const existingProduct =
products.find(
(product)=>product.slug===editing
);


if(existingProduct){

slug =
existingProduct.slug;


productId =
existingProduct.productId;

}

}



const res =
await fetch(

url,

{

method,


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

...form,

productId,

slug,

price:Number(form.price),

originalPrice:Number(form.originalPrice),

stock:Number(form.stock),

images:imageUrl

})

}

);





const data =
await res.json();




if(data.success){


setForm(emptyForm);


setSelectedImage(null);


setEditing(null);



loadProducts();


}



}







function editProduct(
product:Product
){

    setSelectedImage(null);


setEditing(
product.slug
);



setForm({

name:product.name,

category:product.category,

price:String(product.price),

originalPrice:String(product.originalPrice || ""),

images:product.images,

description:product.description,

stock:String(product.stock),

featured:product.featured,

bestseller:product.bestseller

});

}







async function deleteProduct(
slug:string
){



await fetch(

`/api/products/${slug}`,

{

method:"DELETE"

}

);



await loadProducts();


}









return(


<div className="mx-auto max-w-7xl px-4 py-10">



<h1 className="mb-8 text-3xl font-bold">

Product Management

</h1>





<div className="mb-10 rounded-xl border p-6">



<h2 className="mb-5 text-xl font-bold">

{

editing

?

"Edit Product"

:

"Add Product"

}

</h2>





<div className="grid gap-4">

<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Product Name"
className="rounded border p-3"
/>


<input
name="category"
value={form.category}
onChange={handleChange}
placeholder="Category"
className="rounded border p-3"
/>



<input
name="price"
value={form.price}
onChange={handleChange}
placeholder="Price"
className="rounded border p-3"
/>



<input
name="originalPrice"
value={form.originalPrice}
onChange={handleChange}
placeholder="Original Price"
className="rounded border p-3"
/>



<input
name="stock"
value={form.stock}
onChange={handleChange}
placeholder="Stock"
className="rounded border p-3"
/>



<label
className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition hover:bg-slate-100">
<div className="text-center">
<div className="text-4xl">
📷
</div>


<p className="mt-2 font-semibold">
{
selectedImage
?
selectedImage.name
:
"Upload Product Image"
}
</p>


<p className="mt-1 text-sm text-slate-500">
Click to choose JPG / PNG image
</p>


</div>


<input

type="file"

accept="image/*"

onChange={(e)=>{

if(e.target.files){

setSelectedImage(
e.target.files[0]
);

}

}}

className="hidden"

/>


</label>

{
    selectedImage && (
        <Image
        src={URL.createObjectURL(selectedImage)}
        alt="Selected"
        width={128}
        height={128}
        className="mt-2 h-32 w-32 object-cover"
        />
    )
}

{!selectedImage && form.images && (

<Image

src={form.images}

alt="Current product"

width={128}

height={128}

className="mt-3 rounded-lg object-cover"

/>

)}



<textarea
name="description"
value={form.description}
onChange={handleChange}
placeholder="Description"
className="rounded border p-3"
/>




<button

onClick={saveProduct}

className="rounded bg-black py-3 text-white"

>

Save Product

</button>



</div>


</div>








<div className="space-y-5">



{

products.map(product=>(



<div

key={product._id}

className="flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center md:justify-between"

>



<div>


<h2 className="text-lg font-bold">

{product.name}

</h2>


<p>
Category: {product.category}
</p>


<p>
Price: ₹{product.price}
</p>


<p>
Stock: {product.stock}
</p>



</div>





<div className="flex gap-3">



<button

onClick={()=>editProduct(product)}

className="rounded bg-blue-600 px-4 py-2 text-white"

>

Edit

</button>





<button
onClick={()=>deleteProduct(product.slug)}
className="rounded bg-red-600 px-4 py-2 text-white"

>

Delete

</button>




</div>




</div>



))

}



</div>





</div>


)

}