import { axiosClient } from "./axios";

export const getCategories = () => axiosClient.get("/api/categories");

export const addNewProduct = (values) =>
  axiosClient.post("/api/products", values);

export const getProducts = (pagingState) =>
  axiosClient.get(
    `/api/products?page=${pagingState.currentPage}&limit=${pagingState.pageSize}`
  );

export const deleteProduct = (id) => axiosClient.delete(`/api/products/${id}`);

export const getProductById = (id) => axiosClient.get(`/api/products/${id}`);

export const updateProduct = (id, values) =>
  axiosClient.patch(`/api/products/${id}`, values);
