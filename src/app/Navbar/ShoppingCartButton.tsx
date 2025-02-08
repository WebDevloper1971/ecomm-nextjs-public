"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/helper/format";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
  isLoggedIn: boolean;
}

const ShoppingCartButton = ({ cart, isLoggedIn }: ShoppingCartButtonProps) => {
  const closeDropdown = () => {
    const element = document.activeElement as HTMLElement;
    if (element) {
      element.blur();
    }
  };
  return (
    <div>
      {" "}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          aria-label="cart-btn"
          className="btn btn-circle btn-ghost"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="size-6"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            {cart && isLoggedIn && cart.size > 0 ? (
              <span className="badge indicator-item badge-sm">
                {cart?.size}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          tabIndex={0}
          className="card dropdown-content card-compact z-[1] mt-3 w-52 items-center bg-base-100 shadow-2xl"
        >
          <div className="card-body">
            <span className="w-full text-center text-lg font-bold">
              {cart?.size || 0} Items
            </span>
            <span className="text-sm text-green-800">
              Total: {formatPrice(cart?.totalPrice || 0)}
            </span>
            <div className="card-actions">
              <Link
                href={"/cart"}
                onClick={closeDropdown}
                className="flex h-12 w-full items-center justify-center rounded-sm bg-[#000] px-3 text-sm text-white"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
