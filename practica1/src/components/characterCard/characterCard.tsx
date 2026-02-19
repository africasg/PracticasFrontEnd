import type { Character } from "../../types";
import "./characterCard.css"
export const CharacterCard =(params:{name?:string,character?:Character})=>{
    return(
        <>
        <div className = "Card">
        <h1 className="Nombre">{params.character?.name} </h1>
        <p>Género: {params.character?.gender}</p>
        <p>Nacimiento: {params.character?.birth_year}</p>
       </div>
        </>
    )

}


