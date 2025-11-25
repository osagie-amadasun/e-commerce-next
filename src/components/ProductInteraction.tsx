"use client";

import { ProductType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
                style={{backgroundColor: colour}}
              />
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm"></div>
    </div>
  );
};

export default ProductInteraction;
