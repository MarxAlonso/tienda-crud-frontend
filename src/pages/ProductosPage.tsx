import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import Loader from "../components/Loader";

interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoEdit, setProductoEdit] = useState<Producto | undefined>();
  const [loading, setLoading] = useState(false);

  const cargarProductos = async () => {
    setLoading(true);
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleCreateOrUpdate = async (p: Producto) => {
    setLoading(true);
    if (productoEdit) {
      const updated = await updateProducto(productoEdit.id!, p);
      // 🔹 Actualizamos el estado local sin volver a pedir al backend
      setProductos((prev) =>
        prev.map((prod) =>
          prod.id === productoEdit.id ? { ...updated } : prod
        )
      );
    } else {
      const nuevo = await createProducto(p);
      // 🔹 Agregamos el nuevo producto directamente
      setProductos((prev) => [...prev, nuevo]);
    }
    setProductoEdit(undefined);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    await deleteProducto(id);
    setProductos((prev) => prev.filter((p) => p.id !== id));
    setLoading(false);
  };

  return (
    <div className="p-4">
      {loading && <Loader />}
      <ProductForm onSubmit={handleCreateOrUpdate} productoEdit={productoEdit} />
      <ProductTable
        productos={productos}
        onEdit={(p) => setProductoEdit(p)}
        onDelete={handleDelete}
      />
    </div>
  );
}
