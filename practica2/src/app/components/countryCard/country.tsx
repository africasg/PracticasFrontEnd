"use client"

import { api } from "@/lib/api/axios"
import type { Country } from "@/app/types"
import { useRouter } from "next/navigation"
import "./country.css"
import { use, useEffect, useState } from "react"
import { getCountryByName } from "@/lib/api/countryByName"

export const CountryByName = (params:{name:string, country?: Country}) =>{
    const name = params.name
    const paramsCountry = params.country

    const router = useRouter();

    const [country,setCountry] = useState<Country|null>(paramsCountry?paramsCountry:null);

    useEffect(()=>{
        !country && name && getCountryByName(name).then(res=>{
         setCountry(res.data[0])
        })
    },[name])

    return(
        <div className="mainContainer">
            <div className="textContainer">
                <div className="imageContainer">
                    <img src={country?.flags.png}
                    />
                    <div className="countryDataContainer">

                        <h2 className="nameContainer">
                            {country?.name.common}
                        </h2>
                        <p>Population: {country?.population}</p>
                        <button 
                        className="botonVer"
                        onClick={() => router.push(`/country/${country?.name.common}`)}
                        >
                         Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )



}
