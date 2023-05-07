import { axiosClient } from "./axios";

export const getCategories = () => axiosClient.get("/api/categories");

export const addNewBook = (values) => axiosClient.post("/api/books", values);

export const getBooks = (pagingState) =>
  axiosClient.get(
    `/api/books?page=${pagingState.currentPage}&limit=${pagingState.pageSize}`
  );

export const deleteBook = (id) => axiosClient.delete(`/api/books/${id}`);

export const getBookById = (id) => axiosClient.get(`/api/books/${id}`);

export const updateBook = (id, values) =>
  axiosClient.patch(`/api/books/${id}`, values);
