"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {

  const { user, loading } = useAuth();

  const router = useRouter();

  const items = useCartStore(
    (state) => state.items
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );



  useEffect(() => {

    if (!loading) {

      if (!user) {

        router.replace("/login");

        return;

      }

      if (user.role === "admin") {

        router.replace("/admin/dashboard");

      }

    }

  }, [
    user,
    loading,
    router
  ]);



  const [form, setForm] = useState({

    customerName: "",
    email: "",
    phone: "",
    address: "",

  });



  const subtotal = items.reduce(

    (sum, item) =>
      sum + item.price * item.quantity,

    0

  );



  const gst = Math.round(
    subtotal * 0.18
  );



  const shipping =
    subtotal > 999 ? 0 : 99;



  const total =
    subtotal + gst + shipping;



  const handleChange = (

    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >

  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };



  const handlePlaceOrder = async () => {

    if (!user) {

      alert("Please login first");

      return;

    }

    if (items.length === 0) {

      alert("Cart is empty");

      return;

    }



    const response =
      await fetch(
        "/api/orders/create",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({

            customerName:
              form.customerName,

            email:
              form.email,

            phone:
              form.phone,

            address:
              form.address,

            items,

            subtotal,

            gst,

            shipping,

            total

          })

        }
      );



    const data =
      await response.json();



    if (data.success) {

      alert(
        "Order created successfully"
      );

      clearCart();

      router.push("/order-success");

    }

    else {

      alert(
        data.message ||
        "Order creation failed"
      );

    }

  };



  if (loading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }



  if (!user || user.role === "admin") {

    return null;

  }



  return (

    <div className="mx-auto bg-white max-w-7xl px-4 py-10">

      <h1 className="mb-8 text-3xl font-bold">

        Checkout

      </h1>



      <div className="grid gap-10 md:grid-cols-2">

        <div>

          <input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Full Name"
            className="mb-4 w-full border p-3"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-4 w-full border p-3"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="mb-4 w-full border p-3"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="mb-4 w-full border p-3"
          />

        </div>



        <div className="rounded-lg border p-6">

          <h2 className="mb-6 text-xl font-bold">

            Order Summary

          </h2>



          <div className="space-y-3">

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span>₹{subtotal}</span>

            </div>



            <div className="flex justify-between">

              <span>GST</span>

              <span>₹{gst}</span>

            </div>



            <div className="flex justify-between">

              <span>Shipping</span>

              <span>₹{shipping}</span>

            </div>



            <hr />



            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>₹{total}</span>

            </div>

          </div>



          <button

            onClick={handlePlaceOrder}

            className="mt-8 w-full cursor-pointer rounded-lg bg-blue-900 py-3 text-white"

          >

            Place Order

          </button>

        </div>

      </div>

    </div>

  );

}