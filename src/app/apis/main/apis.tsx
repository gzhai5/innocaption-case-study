import { instance } from "../base/instance";
import { Products, AddProductResponse, DeleteProductResponse } from "./interfaces";

export const getAllProducts = async (): Promise<Products> => {
  const response = await instance.get("/products");
  return response.data;
}

export const getAllCategories = async (): Promise<string[]> => {
  const response = await instance.get("/products/categories");
  return response.data;
}

export const searchProducts = async (query: string): Promise<Products> => {
  const response = await instance.get(`/products/search?q=${query}`);
  return response.data;
}

export const addItemToCart = async (title: string): Promise<AddProductResponse> => {
    const response = await instance.post("/products/add", { title: title });
    return response.data;
};

export const deleteItemFromCart = async (id: number): Promise<DeleteProductResponse> => {
    const response = await instance.delete(`/products/${id}`);
    return response.data;
}