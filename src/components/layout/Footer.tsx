import Link from "next/link";


export default function Footer() {


const categories = [
{
name:"Toys",
slug:"toys"
},
{
name:"Board Games",
slug:"board-games"
},
{
name:"Metal Cars",
slug:"metal-cars"
},
{
name:"RC Cars",
slug:"rc-cars"
}
];


return (

<footer className="mt-20 border-t bg-slate-50">


<div className="mx-auto max-w-7xl px-4 py-10">


<div className="grid gap-8 md:grid-cols-4">



<div>

<h3 className="font-bold text-lg">

Simplyfiy Toy Store

</h3>


<p className="mt-3 text-sm text-slate-600">

Toys that inspire imagination,
creativity and learning.

</p>


</div>






<div>

<h4 className="font-semibold">

Categories

</h4>



<ul className="mt-3 space-y-2 text-sm">


{
categories.map((cat)=>(


<li key={cat.slug}>


<Link

href={`/category/${cat.slug}`}

className="hover:text-blue-700 transition"

>

{cat.name}

</Link>


</li>


))

}



</ul>


</div>







<div>


<h4 className="font-semibold">

Support

</h4>



<ul className="mt-3 space-y-2 text-sm">


<li>

<Link href="/contact">

Contact Us

</Link>

</li>


<li>

<Link href="/shipping-policy">

Shipping Policy

</Link>

</li>


<li>

<Link href="/returns">

Returns

</Link>

</li>



</ul>


</div>







<div>


<h4 className="font-semibold">

Legal

</h4>



<ul className="mt-3 space-y-2 text-sm">


<li>

<Link href="/terms">

Terms & Conditions

</Link>

</li>



<li>

<Link href="/privacy-policy">

Privacy Policy

</Link>

</li>



</ul>


</div>






</div>







<div className="mt-10 border-t pt-6 text-center text-sm text-slate-500">


© {new Date().getFullYear()} Simplyfiy Toy Store


</div>




</div>


</footer>

);

}