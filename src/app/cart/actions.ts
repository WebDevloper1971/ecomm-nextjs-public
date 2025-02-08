"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const setProductQuantity = async (
  productId: string,
  quantity: number,
) => {
  const cart = (await getCart()) ?? (await createCart());
  const isInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (isInCart) {
      await prisma.cartItem.delete({ where: { id: isInCart.id } });
    }
  } else {
    if (isInCart) {
      await prisma.cartItem.update({
        where: { id: isInCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }

  revalidatePath("/cart", "page");
};
