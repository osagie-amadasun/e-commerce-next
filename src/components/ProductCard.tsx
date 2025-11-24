"use client";

import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";


const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    colour: product.colors[0], 
  });

  const {addToCart} = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize:productTypes.size,
      selectedColor:productTypes.colour,
    })
    toast.success("Added to cart successfully!")
  };

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "colour";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-2/3">
          <Image
            src={product.images[productTypes.colour]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4 p-4">
        <h1>{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZES */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md cursor-pointer px-2 py-1"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option value={size} key={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLOURS */}
          <div className="">
            <span className="text-xs text-gray-500">Colour</span>
            <div className="flex items-center gap-2">
              {product.colors.map((colour) => (
                <div
                  className={`cursor-pointer border ${
                    productTypes.colour === colour
                      ? "border-gray-400"
                      : "border-gray-200"
                  } rounded-full p-[1.2] `}
                  key={colour}
                  onClick={() =>
                    handleProductType({ type: "colour", value: colour })
                  }
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: colour }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRICE AND BUTTON */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-600">
            ${product.price.toFixed(2)}
          </h1>
          <button onClick={handleAddToCart} className="flex items-center gap-2 ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
