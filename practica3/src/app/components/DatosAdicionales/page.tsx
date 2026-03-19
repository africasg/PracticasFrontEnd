'use client'

import { Product } from "@/app/types"
import { useRouter } from "next/navigation"

type Props = {
  producto: Product
}

const DatosAdicionales = ({ producto }: Props) => {
  const router = useRouter();

  return (
    <div>

      <p>{producto.description}</p>
      <p><b>Marca:</b> {producto.brand}</p>
      <p><b>Rating:</b> {producto.rating}</p>
      <p><b>Stock:</b> {producto.stock}</p>
      <p><b>Precio:</b> {producto.price}€</p>

      <button onClick={() => router.back()}>
        ← Volver
      </button>

    </div>
  )
}

export default DatosAdicionales;