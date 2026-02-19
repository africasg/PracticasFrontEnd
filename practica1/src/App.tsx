import { useEffect,useState } from 'react';
import type { Character } from './types';
import axios from "axios"
import { Loading } from "./components/loader/loader";
import {Errorcillo} from "./components//error/error";
import './App.css'
import { CharacterList } from './components/characterList/characterList';

const App = () => {
  const [pagina,setPagina] = useState<number>(1);
  const [characters,setCharacters] = useState<Character[]>([]);
  const [loading,setLoading] =useState<boolean>(true);
  const [error,setError] = useState<string|null> (null);
  let miUrl = "https://swapi.dev/api/people/"

  useEffect(()=>{
  miUrl= miUrl + `?page=${pagina}`
  axios.get(miUrl)
  .then(res=>{
    setCharacters([...characters, ...res.data.results])
    setError(null)
  })
  .catch((e)=>{
    setError(`Error cargando los datos: ${e.message ? e.message:e}`);
  })
  .finally(()=>{
    setLoading(false)
  })
  },[pagina])
  
  return (
    <>
    <div className='General'>
     <h1>Lista de personajes de Star Wars </h1>
     {loading && <Loading/>}
     {error && <Errorcillo error={error}/>}
      <div>
       <CharacterList characters= {characters}/>
      <button onClick={() => setPagina(pagina + 1)}>Siguiente Página </button>
      </div>
      </div>
    </>
  )
}

export default App
