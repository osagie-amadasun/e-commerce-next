/**
 * Cart Page Component
 * 
 * This page displays the shopping cart with a multi-step checkout process.
 * 
 * IMPORTANT FIX APPLIED:
 * ======================
 * This file was refactored to fix a Next.js build error that was preventing deployment.
 * 
 * ORIGINAL PROBLEM:
 * - Build error: "useSearchParams() should be wrapped in a suspense boundary at page '/cart'"
 * - Error occurred during: Next.js build/prerender phase
 * - Root cause: useSearchParams() hook was used directly in the page component without Suspense
 * 
 * WHY THE ERROR OCCURRED:
 * - Next.js attempts to statically generate pages at build time for better performance
 * - useSearchParams() reads URL query parameters which are only available at request/runtime
 * - This creates a conflict: static generation vs. dynamic runtime data
 * - Without Suspense, Next.js doesn't know how to handle this dynamic requirement during build
 * 
 * THE SOLUTION:
 * - Split the component: Extracted logic into CartContent (uses useSearchParams) 
 * - Added Suspense wrapper: Created CartPage to wrap CartContent with Suspense boundary
 * - This tells Next.js: "This section is dynamic, handle it appropriately at runtime"
 * 
 * RESULT:
 * - Build now succeeds without errors
 * - Page still works exactly the same for users
 * - Follows Next.js best practices for dynamic content
 * 
 * For more details, see comments in CartContent and CartPage components below.
 */

"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { ShippingData } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
// IMPORTANT: Added Suspense to the React imports
// This is required to wrap components that use useSearchParams() hook
// Problem: Next.js 13+ requires that any component using useSearchParams() must be wrapped
//          in a Suspense boundary. This is because useSearchParams() causes the component
//          to opt-out of static rendering and makes it dynamically rendered at request time.
//          Without Suspense, Next.js cannot properly handle the async nature of reading
//          search parameters during the build/prerender phase, causing build failures.
import { Suspense, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Method",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray",
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "black",
//   },
// ];

/**
 * CartContent Component - Contains the main cart logic that uses useSearchParams()
 * 
 * WHY THIS COMPONENT EXISTS:
 * - We extracted the original CartPage component logic into this separate component
 * - This component uses useSearchParams() hook which requires a Suspense boundary wrapper
 * - By separating it, we can wrap it in Suspense in the parent CartPage component
 * 
 * THE PROBLEM IT SOLVES:
 * - Next.js build process failed with error: "useSearchParams() should be wrapped in a suspense boundary"
 * - This happened because Next.js tries to statically generate pages at build time
 * - useSearchParams() reads URL search parameters which are only available at runtime
 * - Without Suspense, Next.js can't handle this dynamic behavior during build/prerender
 * - The Suspense boundary tells Next.js: "This part is dynamic, show a fallback while it loads"
 * 
 * TECHNICAL DETAILS:
 * - This is a client component ("use client" at top of file)
 * - It reads the "step" query parameter to determine which checkout step to show
 * - The step determines what content is rendered (cart items, shipping form, or payment form)
 */
const CartContent = () => {
  // This hook reads URL search parameters (e.g., ?step=2)
  // It requires the component to be wrapped in Suspense because it's dynamic
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingData | null>(null);

  const { cart, removeFromCart } = useCartStore();

  // Parse the "step" query parameter from the URL to determine the active checkout step
  // Defaults to step 1 if no step parameter is present
  const activeStep = parseInt(searchParams.get("step") || "1");

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center justify-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`flex items-center justify-center rounded-full w-8 h-8 font-semibold bg-black text-white ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* CART ITEMS & DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-5">
          {activeStep === 1 ? (
            cart.map((cartItem) => (
              <div
                className="flex items-center justify-between"
                key={
                  cartItem.id + cartItem.selectedColor + cartItem.selectedSize
                }
              >
                <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={cartItem.images[cartItem.selectedColor]}
                    alt={cartItem.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 ml-4">
                  <div className="">
                    <p className="text-sm font-medium">{cartItem.name}</p>
                    <p className="text-xs text-gray-500">
                      Quantity: {cartItem.quantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {cartItem.selectedSize}
                    </p>
                    <p className="text-xs text-gray-500">
                      Colour: {cartItem.selectedColor}
                    </p>
                  </div>
                  <p className="font-medium">${cartItem.price.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(cartItem)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center p-2 cursor-pointer"
                >
                  <Trash2 />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue
            </p>
          )}
        </div>

        <div className="w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-500">
                Discount <s>(10%)</s>
              </p>
              <p className="font-medium">$10</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10</p>
            </div>

            <hr className="text-gray-400" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-black text-white flex items-center justify-center p-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 gap-2 transition-all duration-300"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * CartPage Component - Main page component that wraps CartContent in Suspense
 * 
 * WHY THIS COMPONENT EXISTS:
 * - This is the actual page component exported as default (Next.js requirement)
 * - It serves as a wrapper that provides the required Suspense boundary
 * - The Suspense boundary is mandatory when child components use useSearchParams()
 * 
 * THE SOLUTION TO THE BUILD ERROR:
 * - Original problem: Build failed because useSearchParams() was used directly in the page component
 *   without a Suspense boundary, causing Next.js to fail during static generation
 * - Solution: Split the logic into CartContent (uses useSearchParams) and CartPage (provides Suspense)
 * - The Suspense boundary tells Next.js: "This component tree needs search params, which are dynamic,
 *   so don't try to statically generate it - render it at request time instead"
 * 
 * HOW IT WORKS:
 * - During build/prerender: Next.js sees the Suspense boundary and knows this part is dynamic
 * - It renders the fallback UI during the build phase (static generation)
 * - At runtime: When a user visits the page, React suspends rendering, reads the search params,
 *   then renders CartContent with the actual step value from the URL
 * - The fallback is shown only if there's a delay reading search params (rare, but handled gracefully)
 * 
 * BENEFITS:
 * - Fixes the build error that was preventing deployment
 * - Maintains proper Next.js rendering behavior (static where possible, dynamic where needed)
 * - Provides a better user experience with a loading fallback
 * - Follows Next.js best practices for handling dynamic content
 */
const CartPage = () => {
  return (
    <Suspense 
      // Fallback UI shown while search parameters are being read
      // This is especially important during SSR/hydration when params might not be immediately available
      fallback={
        <div className="flex items-center justify-center mt-12">
          <div className="text-lg">Loading cart...</div>
        </div>
      }
    >
      {/* CartContent uses useSearchParams(), so it must be wrapped in Suspense */}
      <CartContent />
    </Suspense>
  );
};

export default CartPage;
