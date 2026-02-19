import type { Character } from "../../types";
import { CharacterCard } from "../characterCard/characterCard";



export const CharacterList = ({characters}: {characters: Character[]}) => {
  return (
    <>
      {characters.map((character) => <CharacterCard key={character.name}character={character}/>)}
    </>
  
  
  )
};
