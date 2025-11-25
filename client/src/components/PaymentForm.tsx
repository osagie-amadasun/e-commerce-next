import { paymentFormInputs, paymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<paymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();

  const handlePaymentForm: SubmitHandler<paymentFormInputs> = (data) => {
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form
      action=""
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(() => {})}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolder"
          className="text-xs text-gray-500 font-medium"
        >
          Name on Card
        </label>
        <input
          className="border-b border-gray-300 py-2 outline-0 text-sm"
          type="text"
          id="cardHolder"
          placeholder="Sergei Rachmaninoff"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardNumber"
          className="text-xs text-gray-500 font-medium"
        >
          Card Number
        </label>
        <input
          className="border-b border-gray-300 py-2 outline-0 text-sm"
          type="number"
          id="cardNumber"
          placeholder="0000 0000 0000 0000"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="expirationDate"
          className="text-xs text-gray-500 font-medium"
        >
          Expiration Date
        </label>
        <input
          className="border-b border-gray-300 py-2 outline-0 text-sm"
          type="date"
          id="expirationDate"
          placeholder="MM/YY"
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-xs text-red-500">
            {errors.expirationDate.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input
          className="border-b border-gray-300 py-2 outline-0 text-sm"
          type="number"
          id="cvv"
          placeholder="007"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">{errors.cvv.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src={"/klarna.png"}
          alt="klarna"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src={"/cards.png"}
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src={"/stripe.png"}
          alt="stripe"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white flex items-center justify-center p-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 gap-2 transition-all duration-300"
      >
        Checkout <ShoppingCart className="w-4 h-4" />
      </button>
    </form>
  );
};

export default PaymentForm;
