"use client"

import { Product } from "@/app/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "./product.css"

export const ProductCard = (params: { product?: Product; id?: number }) => {
  const router = useRouter();

  const paramsProduct = params.product;
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(
    paramsProduct ? paramsProduct : null
  );
  useEffect(() => {
    if (!product && id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, [id]);
  return (
    <div className="mainContainer">
      <div className="textContainer">
        <div className="imageContainer">
          <img
            src={product?.thumbnail}
            alt={product?.title}
          />
          <div className="productDataContainer">
            <h3 className="titleContainer">
              {product?.title}
            </h3>
            <div className="categoryBadge">
              {product?.category}
            </div>

            <p className="price">
              {product?.price}€
            </p>

            <button
              className="botonVer"
              onClick={() => router.push(`/product/${product?.id}`)}
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};