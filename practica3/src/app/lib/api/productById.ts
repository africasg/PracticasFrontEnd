import { api } from "./axios";

export const getProductById = async (id: number) => {
  const res = await api.get(`https://dummyjson.com/products/${id}`);
  return res;
};