"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

export async function getOrders() {
  const session = await auth();
  const list = [];
  const orders = await prisma.order.findMany({
    where: { email: session?.user.email },
  });

  for (const o of orders) {
    const singleOrderItem = await getProductList(o.cartId);

    list.push({
      list: singleOrderItem?.items,
      total: singleOrderItem?.totalPrice,
      date: singleOrderItem?.date,
    });
  }

  return list;
}

export async function getProduct(productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  return product?.name;
}

async function getProductList(cartId: string) {
  const citems = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!citems) {
    return null;
  }
  return {
    items: citems.items.map((n) => ({
      name: n.product.name,
      price: n.product.price,
      quantity: n.quantity,
    })),
    totalPrice: citems!.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
    date: citems.createdAt,
  };
}
