"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());
  const isInCart = cart.items.find((item) => item.productId === productId);
  if (isInCart) {
    if (isInCart.quantity < 2) {
      await prisma.cartItem.update({
        where: { id: isInCart.id },
        data: { quantity: { increment: 1 } },
      });
      revalidatePath("/products/[id]", "page");
      return { message: "Item added to cart", status: 200 };
    } else {
      return { message: "Only Two Pieces Per Watch Per Cart", status: 400 };
    }
  } else {
    if (cart.items.length < 5) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
      revalidatePath("/products/[id]", "page");
      return { message: "Item added to cart", status: 200 };
    } else {
      return { message: "Only Five Watches Per User", status: 400 };
    }
  }
}

export async function decrementProductQuantity(productId: string) {
  const cart = await getCart();
  if (!cart) {
    return null;
  }
  const isInCart = cart.items.find((item) => item.productId === productId);
  if (isInCart) {
    await prisma.cartItem.update({
      where: { id: isInCart.id },
      data: { quantity: { decrement: 1 } },
    });
  } else {
    return null;
  }

  revalidatePath("/products/[id]");
}
