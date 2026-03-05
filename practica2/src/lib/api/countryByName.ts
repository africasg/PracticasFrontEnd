import { api } from "./axios";
import { Country } from "@/app/types";

export const getCountryByName = async (name:string) =>{
    const respuesta = await api.get<Country[]>(`/v3.1/name/${name}`)
    console.log(respuesta)
    return respuesta;
}