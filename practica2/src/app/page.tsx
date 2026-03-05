"use client"
import { useEffect, useState } from "react";
import "./globals.css"

import { Country } from "./types";

import { CountryByName } from "./components/countryCard/country";
import { api } from "@/lib/api/axios";
import { getAllCountries } from "@/lib/api/allCountries";


const Home =() =>{
  const [search,setSearch] = useState<string>("");
  const [inputName,setInputName] = useState<string>("")
  const [countries,setCountries] = useState<Country[]>([]);
  const [pagina, setPagina] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [miErrorcillo, setError] = useState<string>("");
 
  
    useEffect(() => {
    getAllCountries().then((res)=>{
        setCountries(res.data)
        setError("")
        }).catch((e) => {
        setError(`Error cargando los datos: ${e.message ? e.message: e}`)
      })
      .finally(()=>{
        setLoading(false);
      })

  }, [])
  const borrarFiltros = () => {
  setSearch("");
  setInputName("");
  setPagina(1);
  setError("");
};
  
  
return (
  <div className="mainContainer">

    <div className="headerContainer">
      <h1 className="tituloPrincipal">
        Archivo de Países
      </h1>
    </div>

    <div className="searchContainer">
      <form
        className='buscador'
        onSubmit={(e) => {
          e.preventDefault()
          setSearch(inputName)
          
        }}
      >
        <label> Nombre: </label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      
      {search && (
  <button 
    className="botonBorrarFiltros" 
    onClick={borrarFiltros}

  >
    Borrar Filtros
  </button>
)}
    </div>

    <div className="infoContainer">
      {search && loading && <h1>Loading...</h1>}
      {miErrorcillo && <h2>{miErrorcillo}</h2>}
    </div>

      <div className="countryContainer">
      {countries
        .filter((x) =>
          x.name.common.toLowerCase().includes(search.toLowerCase())
        )
        .map((e) => (
          <CountryByName
            key={e.name.common}
            name={e.name.official}
            country={e}
          />
        ))}
    </div>
  </div>
)
}
export default Home;