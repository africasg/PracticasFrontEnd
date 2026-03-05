import { api } from "./axios";
import { Country } from "@/app/types";

export const getAllCountries = async () =>{
    const respuesta = await api.get(`/v3.1/all?fields=name,flags,population`)
    return respuesta;
}