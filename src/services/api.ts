import axios from "axios";
interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

const API_URL = "http://localhost:3000/productos";

export const getProductos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProductoById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createProducto = async (producto: Producto) => {
  const res = await axios.post(API_URL, producto);
  return res.data;
};

export const updateProducto = async (id: number, producto: Producto) => {
  const res = await axios.put(`${API_URL}/${id}`, producto);
  return res.data;
};

export const deleteProducto = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const getProductosByCategoria = async (categoria: string) => {
  const res = await axios.get(`${API_URL}/categoria/${categoria}`);
  return res.data;
};
