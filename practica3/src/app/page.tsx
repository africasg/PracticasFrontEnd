"use client"

import "./page.css";
import { useEffect, useState } from "react";
import { Product } from "./types";
import { getProducts } from "./lib/api/allProducts";
import { SectionContainer } from "./components/SectionContainer/page";
import { SearchBar } from "./components/Header/page";
import ProductGrid from "./components/ProductGrid/page";

const Home = () => {

  const [search, setSearch] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [miError, setError] = useState<string>("");

  const borrarFiltros = () => {
    setInputName("");
    setSearch("");
  };

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res.data.products);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message ? e.message : e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const productosFiltrados = products.filter((x) =>
    x.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='mainContainer'>
      <h1 className="tituloPrincipal">
        Pagina de Productos
      </h1>
      <SectionContainer>
        <form
          className='buscador'
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(inputName);
          }}
        >
          <p>Nombre:</p>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button type="submit">
            Buscar
          </button>
          {search && (
            <button
              type="button"
              className="botonBorrarFiltros"
              onClick={borrarFiltros}
            >
              Borrar filtros
            </button>
          )}
        </form>
      </SectionContainer>

      <p>Resultados: {productosFiltrados.length}</p>
      {loading && <h1>Loading...</h1>}
      {miError && <h2>{miError}</h2>}

      <SectionContainer>
        <ProductGrid products={productosFiltrados} />
      </SectionContainer>
    </div>
  );
};

export default Home;