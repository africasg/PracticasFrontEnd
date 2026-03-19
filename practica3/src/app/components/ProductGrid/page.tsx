"use client"

import { Product } from "@/app/types";
import { ProductCard } from "../ProductCard/page";

type Props = {
  products: Product[];
};

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="characterContainer">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;