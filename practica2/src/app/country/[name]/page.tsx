"use client"

import { Country } from "@/app/types"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { getCountryByName } from "@/lib/api/countryByName"
import "./page.css"

const PaisConcreto = () =>{
    const router = useRouter()
    const {name} = useParams()
    let nombreBueno = String(name)

    const [pais,setPais] = useState<Country|null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [miErrorcillo, setError] = useState<string>("");
 useEffect(()=>{
    getCountryByName(String(name)).then((res)=>{
        setPais(res.data[0])
        setError
    }).catch((e)=>{
        setError(`Error cargando los datos: ${e.message? e.message:e}`)
    }).finally(()=>{
        setLoading(false);
    })
 },[name])
    return(
        <div className="containerDetalle">
             {loading && <h1>Loading...</h1>}
             {miErrorcillo && <h2>{miErrorcillo}</h2>}

             {pais && (
                <>
                <h1 className="titulo">{pais.name.official.toUpperCase()}</h1>
                <img src={pais.flags.png}/>
                <p>Capital: {pais.capital.at(0)}</p>
                <p>Subregions: {pais.subregion}</p>
                <p>Currency: {Object.values(pais.currencies).map(e=>e.name+", ")}</p>
                <p>Languages: {Object.values(pais.languages).map(e=>e+", ")}</p>
                

                </>
             )}
             {pais && (
          <div className="Botoncillo">
         <button
      className="BotonVolver"
            onClick={() => router.back()}
          >  ← Volver

        </button>
        </div>
)}
    </div>
        
    )
}
export default PaisConcreto