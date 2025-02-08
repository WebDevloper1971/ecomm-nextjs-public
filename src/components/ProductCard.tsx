import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 1;
  return (
    <Link
      href={`/products/${product.id}`}
      className="card w-full rounded-sm bg-base-100 shadow-md transition-shadow"
    >
      <figure>
        <Image
          src={product.imageUrl}
          width={600}
          height={300}
          className="h-52 object-cover"
          alt="product-image"
        />
      </figure>
      <div className="card-body gap-6">
        {isNew && (
          <div className="w-fit rounded-md bg-yellow-200 p-1">LATEST</div>
        )}

        <h2 className="card-title line-clamp-1">{product.name}</h2>

        <p className="line-clamp-3">{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
};

export default ProductCard;
