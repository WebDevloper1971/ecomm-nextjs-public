import { createCart, getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/helper/format";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: "Your Cart - Vadanam",
};

const CartPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const cart = await getCart();
  return (
    <div className="m-auto flex w-full max-w-[300px] flex-col items-center sm:max-w-4xl">
      <h1 className="mb-10 text-3xl">Your Selected Timepieces :</h1>
      <h2 className="text-xs">
        [Note : Each user can only have 5 pieces of a particular watch ]
      </h2>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty</p>}
      <div className="mt-10 flex flex-col items-end sm:items-center">
        <p className="mb-3 flex w-full gap-6 text-center text-3xl font-semibold">
          <span>Total :</span>
          <span className="text-green-700">
            {formatPrice(cart?.totalPrice || 0)}
          </span>
        </p>
        {cart?.items.length ? (
          <button
            onClick={async () => {
              "use server";

              const shipping = await prisma.shippingInfo.findFirst({
                where: { email: session.user.email },
              });

              if (!shipping) {
                redirect("/profile");
              }

              const cartId = cart.id;
              const email = session.user.email as string;

              const order_limit = 5;
              const orders = await prisma.order.findMany({
                where: { email },
              });
              console.log(orders.length);

              if (orders.length >= order_limit) {
                redirect("/error");
              } else {
                await prisma.order.create({
                  data: {
                    cartId,
                    email,
                  },
                });

                await prisma.user.update({
                  where: { email: email },
                  data: {
                    carts: {
                      push: cartId,
                    },
                  },
                });

                await createCart();
              }
              redirect("/orders");
            }}
            className="my-12 flex h-12 w-full items-center justify-center rounded-sm bg-[#6772FF] text-white sm:w-[200px]"
          >
            Checkout
          </button>
        ) : (
          <Link
            href={"/"}
            className="my-12 flex h-12 w-full items-center justify-center rounded-sm bg-[#6772FF] text-white sm:w-[200px]"
          >
            Go Shopping
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartPage;
