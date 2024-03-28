import { instance } from "../base/instance";
import { Products } from "./interfaces";

export const getAllProducts = async (): Promise<Products> => {
  const response = await instance.get("/products");
  return response.data;
}

export const addItemToCart = async (title: string): Promise<{id: number, title: string}> => {
    const response = await instance.post("/products/add", { title: title });
    return response.data;
};