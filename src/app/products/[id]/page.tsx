import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
import { formatPrice } from "@/lib/helper/format";
import { auth } from "@/auth";

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const product = await getProduct(id);
  return {
    title: product.name + "  - Vadanam",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let isLoggedIn: boolean = false;
  const session = await auth();
  if (session?.user) {
    isLoggedIn = true;
  }

  const id = (await params).id;
  const product = await getProduct(id);
  return (
    <div className="mb-12 mt-20 flex flex-col justify-between sm:items-center md:flex-row">
      <Image
        width={400}
        height={400}
        src={product.imageUrl}
        alt={product.name}
        priority
        className="mb-4 w-full rounded-lg object-cover object-center sm:mb-10 lg:size-[500px]"
      />
      <div className="flex h-full flex-col justify-between gap-6 sm:w-[70%] sm:gap-6 md:w-[40%] md:gap-8">
        <h1 className="text-2xl font-semibold sm:text-2xl">{product.name}</h1>
        <p className="text-justify text-sm leading-6 sm:text-[16px] sm:leading-8">
          {product.description} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ducimus, dolor.
        </p>
        <h1 className="text-lg font-semibold sm:text-xl">
          {formatPrice(product.price)}
        </h1>
        <div>
          <AddToCartButton
            isLoggedIn={isLoggedIn}
            productId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          />
        </div>
      </div>
    </div>
  );
}
