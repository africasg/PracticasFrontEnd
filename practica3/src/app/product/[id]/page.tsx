"use client"
import { Product } from "@/app/types"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProductById } from "@/app/lib/api/productById"
import ElementosDeLaInterfaz from "@/app/components/ElementosdeLaInterfaz/page"
import DatosAdicionales from "@/app/components/DatosAdicionales/page"
import "./page.css"

const ProductoDetalle = () => {
  
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
        useEffect(() => {
        getProductById(Number(id))
            .then((res) => {
            setProduct(res.data)
            setError("")
            })
            .catch((e) => {
            setError(`Error cargando el producto: ${e.message ? e.message : e}`)
            })
            .finally(() => {
            setLoading(false)
            })
        }, [id])

  return (
    <div className="containerDetalle">
      {loading && <h1>Loading...</h1>}
      {error && <h2>{error}</h2>}
      {product && (
        <>
          <div>
            {<ElementosDeLaInterfaz producto={product}>
                </ElementosDeLaInterfaz>}
          </div>
          <div>
            {<DatosAdicionales producto={product}>
                </DatosAdicionales>}
          </div>
          
        </>
      )}

    </div>
  )
}
export default ProductoDetalle
