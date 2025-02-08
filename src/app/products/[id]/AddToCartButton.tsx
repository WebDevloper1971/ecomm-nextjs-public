"use client";

import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (
    productId: string,
  ) => Promise<{ message: string; status: number }>;
  isLoggedIn: boolean;
}
const AddToCartButton = ({
  productId,
  incrementProductQuantity,
  isLoggedIn,
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className={`flex h-12 w-fit items-center gap-4 rounded-sm bg-[#6772FF] p-2 text-white ${isPending ? "disabled:bg-gray-400" : ""}`}
        onClick={() => {
          if (!isLoggedIn) {
            redirect("/sign-in");
          } else {
            setSuccess(false);
            startTransition(async () => {
              const response = await incrementProductQuantity(productId);
              if (response.status === 200) {
                toast.success(response.message);
              } else {
                toast.error(response.message);
              }
              setSuccess(true);
            });
          }
        }}
      >
        Add To Cart
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="size-6"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added To Cart</span>
      )}
    </div>
  );
};

export default AddToCartButton;
