import { axiosClient } from "./axios";

export const addNewCategory = (values) =>
  axiosClient.post("/api/categories", values);

export const getCategory = (pagingState) =>
  axiosClient.get(
    `/api/category?page=${pagingState.currentPage}&limit=${pagingState.pageSize}`
  );

export const deleteCategory = (id) =>
  axiosClient.delete(`/api/categories/${id}`);

export const getCategoryById = (id) => axiosClient.get(`/api/categories/${id}`);

export const updateCategory = (id, values) =>
  axiosClient.patch(`/api/categories/${id}`, values);
