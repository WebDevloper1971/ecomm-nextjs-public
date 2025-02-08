"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/helper/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartEntry = ({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) => {
  const [isPending, setTransition] = useTransition();

  return (
    <div className="flex w-full flex-col rounded-sm sm:items-center">
      <div className="my-4 flex w-full flex-col items-center gap-2 rounded-sm bg-purple-50 shadow-md sm:h-[200px] sm:max-w-[500px] sm:flex-row">
        <div className="h-full w-full rounded-lg sm:w-[50%]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full rounded-sm object-cover object-center"
          />
        </div>
        <div className="mb-2 flex w-full flex-col justify-between gap-4 px-4 sm:w-[50%]">
          <Link
            href={`/products/${product.id}`}
            className="text-lg font-semibold"
          >
            <span className="line-clamp-1">{product.name}</span>
          </Link>
          <h1 className="text-sm">{formatPrice(product.price)}</h1>
          <div className="flex w-full gap-4">
            <button
              className="w-6 rounded-sm border border-red-800 text-red-800"
              onClick={() => {
                setTransition(async () => {
                  await setProductQuantity(product.id, quantity - 1);
                });
              }}
            >
              -
            </button>
            <h2 className="flex items-center gap-4">
              <span className="text-sm">In Cart </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-yellow-400">
                {quantity}
              </span>
            </h2>
            <button
              className="w-6 rounded-sm border border-green-800 text-green-800"
              onClick={() => {
                setTransition(async () => {
                  if (quantity < 2) {
                    await setProductQuantity(product.id, quantity + 1);
                  } else {
                    toast.error("Only 2 orders per Timepiece  ");
                  }
                });
              }}
            >
              +
            </button>
          </div>

          <div className="flex h-8 items-center gap-4 text-sm">
            Subtotal: {formatPrice(product.price * quantity)}{" "}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEntry;
