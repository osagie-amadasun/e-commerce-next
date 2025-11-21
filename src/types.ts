import { z } from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CategoryType = {
  name: string;
  icon: React.ReactNode;
  slug: string;
};

export type CategoryTypes = CategoryType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export type ShippingData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "A valid phone number is required!")
    .max(11, "A valid phone number is required!")
    .regex(/^\d+$/, "Phone number must contain digits only!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type shippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder's name is required!"),
  cardNumber: z
    .string()
    .min(16, "A valid card number is required!")
    .max(16, "A valid card number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9] | 1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type paymentFormInputs = z.infer<typeof paymentFormSchema>;

export type cartStoreStateType = {
  cart: CartItemsType;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
