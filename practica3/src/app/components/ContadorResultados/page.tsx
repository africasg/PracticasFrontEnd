'use client'

import { Product } from "@/app/types"
import "./page.css"
type Props= {
   productos: Product[]
}

const RecibirResultados =  ({productos}:Props) =>{
    return(
        <>
         <p> La cantidad de pruductos es:  {productos.length}</p>
         </>
    )
   
}

export default RecibirResultados;