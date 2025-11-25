"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, PlusIcon, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
    toast.success("Added to cart successfully!");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border p-[4px] ${
                selectedSize === size ? "border-gray-600" : "border-gray-300"
              }`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-6 h-6 ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } flex items-center justify-center`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOUR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Colour</span>
        <div className="flex items-center gap-2">
          {product.colors.map((colour) => (
            <div
              className={`cursor-pointer border rounded-full p-[4px] ${
                selectedColor === colour ? "border-gray-500" : "border-white"
              }`}
              key={colour}
              onClick={() => handleTypeChange("colour", colour)}
            >
              <div
                className={`w-6 h-6 rounded-full`}
                style={{ backgroundColor: colour }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4 text-gray-500" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* BUTTONS */}
        <button
          className="bg-gray-800 text-white px-4 py-2 shadow-lg cursor-pointer flex items-center justify-center gap-2 rounded-md mt-4 text-sm font-medium"
          onClick={handleAddToCart}
        >
          <PlusIcon className="w-4 h-4" />
          <p>Add to Cart</p>
        </button>
        <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 bg-white px-4 py-2 flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer">
          <ShoppingCart className="w-4 h-4" />
          <p>Buy this Item</p>
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;
