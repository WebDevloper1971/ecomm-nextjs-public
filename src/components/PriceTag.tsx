import { formatPrice } from "@/lib/helper/format";

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  return (
    <span
      className={` ${className} w-fit rounded-sm border border-green-700 p-2 text-lg text-green-700 hover:bg-green-700 hover:text-white`}
    >
      {formatPrice(price)}
    </span>
  );
};

export default PriceTag;
