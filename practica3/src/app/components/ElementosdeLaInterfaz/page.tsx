"use client"

import { Product } from "@/app/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
    producto: Product
}
const ElementosDeLaInterfaz = ({producto}: Props) =>{
    const router = useRouter();
    const [numero, setNumero] = useState<number>(0)
    return(
        <div>
            <div className="imagenes">
               <>{
                    <img src={producto.images[numero]} alt={producto.title}></img>
                }
                <button onClick={(()=>{
                    if(numero -1 < 0){
                        setNumero(numero)
                    }
                    else{
                        setNumero(numero- 1)
                    }
                })}>←</button> 
                <button onClick={(()=>{
                    if(numero +1 == producto.images.length){
                        setNumero(numero)
                    }
                    else{
                        setNumero(numero+ 1)
                    }
                })}>→ </button> 
                </>
            </div>
            <div className="compra/info">
                <p>La disponibilidad es: {producto.stock}</p>
                <p>El precio es: {producto.price}</p>
            </div>
        </div>
    )
}
export default ElementosDeLaInterfaz;