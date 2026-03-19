import { api } from "./axios";
import { Product } from "../../types";

export const getProducts = async () => {
  const res = await api.get("https://dummyjson.com/products");
  return res;
};

