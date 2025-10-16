import { useState, useEffect } from "react";
interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

interface Props {
  onSubmit: (producto: Producto) => void;
  productoEdit?: Producto;
}

export default function ProductForm({ onSubmit, productoEdit }: Props) {
  const [producto, setProducto] = useState<Producto>({
    nombre: "",
    precio: 0,
    stock: 0,
    categoria: "",
  });

  useEffect(() => {
    if (productoEdit) setProducto(productoEdit);
  }, [productoEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(producto);
    setProducto({ nombre: "", precio: 0, stock: 0, categoria: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded p-4 max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold mb-3">
        {productoEdit ? "Editar Producto" : "Agregar Producto"}
      </h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={producto.stock}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={producto.categoria}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {productoEdit ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}
