import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  totalPrice: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const cookieStore = await cookies();
  const VernitureCartId = cookieStore.get("VadanamCartId")?.value;
  const cart = VernitureCartId
    ? await prisma.cart.findUnique({
        where: { id: VernitureCartId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const cookieStore = await cookies();
  const newCart = await prisma.cart.create({
    data: {},
  });
  cookieStore.set("VadanamCartId", newCart.id, { httpOnly: true, path: "/" });
  return {
    ...newCart,
    items: [],
    size: 0,
    totalPrice: 0,
  };
}
