"use client";


import {useEffect,useState} from "react";



interface Product{

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




const emptyForm:ProductForm={

productId:"",

name:"",

slug:"",

category:"",

price:0,

originalPrice:0,

images:"",

description:"",

stock:0,

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



async function loadProducts(){


try{


const res =
await fetch("/api/products",{
cache:"no-store"
});


const data =
await res.json();



if(data.success){

setProducts(data.products);

}


}

catch(error){

console.log(
"PRODUCT FETCH ERROR",
error
);

}


}





useEffect(()=>{


loadProducts();


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



const url = editing

?

`/api/products/${editing}`

:

"/api/products";



const method = editing

?

"PATCH"

:

"POST";





const res =
await fetch(url,{

method,

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(form)


});



const data =
await res.json();



if(data.success){


setForm(emptyForm);


setEditing(null);


loadProducts();


}



}







function editProduct(product:Product){


setEditing(product.slug);


setForm({

productId:product.productId,

name:product.name,

slug:product.slug,

category:product.category,

price:product.price,

originalPrice:product.originalPrice,

images:product.images,

description:product.description,

stock:product.stock,

featured:product.featured,

bestseller:product.bestseller


});


}







async function deleteProduct(slug:string){


await fetch(

`/api/products/${slug}`,

{

method:"DELETE"

}

);



loadProducts();


}







return(


<div className="max-w-7xl mx-auto px-5 py-10">


<h1 className="text-3xl font-bold mb-8">

Product Management

</h1>





<div className="border rounded-xl p-6 mb-10">


<h2 className="text-xl font-bold mb-5">

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

name="productId"

value={form.productId}

onChange={handleChange}

placeholder="Product ID"

className="border p-3 rounded"

/>



<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Name"

className="border p-3 rounded"

/>



<input

name="slug"

value={form.slug}

onChange={handleChange}

placeholder="Slug"

className="border p-3 rounded"

/>



<input

name="category"

value={form.category}

onChange={handleChange}

placeholder="Category"

className="border p-3 rounded"

/>



<input

name="price"

value={form.price}

onChange={handleChange}

placeholder="Price"

className="border p-3 rounded"

/>



<input

name="originalPrice"

value={form.originalPrice}

onChange={handleChange}

placeholder="Original Price"

className="border p-3 rounded"

/>



<input

name="stock"

value={form.stock}

onChange={handleChange}

placeholder="Stock"

className="border p-3 rounded"

/>



<input

name="images"

value={form.images}

onChange={handleChange}

placeholder="Image path"

className="border p-3 rounded"

/>



<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Description"

className="border p-3 rounded"

/>



<button

onClick={saveProduct}

className="bg-black text-white rounded py-3"

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

className="border rounded-xl p-5 flex justify-between items-center"

>



<div>


<h2 className="font-bold text-lg">

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

className="bg-blue-600 text-white px-4 py-2 rounded"

>

Edit

</button>



<button

onClick={()=>deleteProduct(product.slug)}

className="bg-red-600 text-white px-4 py-2 rounded"

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