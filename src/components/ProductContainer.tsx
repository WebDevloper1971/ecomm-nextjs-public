"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";

interface ProductContainerProps {
  products: Product[];
}

function ProductContainer({ products }: ProductContainerProps) {
  const [filteredList, setFiltered] = useState<Product[]>([]);

  const handleSearch = (text: string) => {
    if (text.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(text),
      );
      setFiltered(filtered);
    } else {
      setFiltered(products);
    }
  };
  return (
    <div className="m-auto flex min-h-[500px] w-full flex-col gap-4 lg:max-w-[80svw]">
      <input
        className="cursor-pointer rounded border-2 border-slate-400 bg-white p-2 focus:outline-none"
        type="search"
        onChange={(e) => handleSearch(e.target.value.toLowerCase())}
        placeholder="Search Products"
      />
      <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredList.length > 0
          ? filteredList.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })
          : products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
      </div>
    </div>
  );
}

export default ProductContainer;
