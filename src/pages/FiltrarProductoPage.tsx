import { useEffect, useState } from "react";
import {
  getCategorias,
  getProductosByCategoria,
  getProductos,
} from "../services/api";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export default function FiltrarProductoPage() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getCategorias();
      setCategorias(data);
    };
    fetchCategorias();
    cargarTodos();
  }, []);

  const cargarTodos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const filtrarPorCategoria = async (categoria: string) => {
    setCategoriaSeleccionada(categoria);
    const data = await getProductosByCategoria(categoria);
    setProductos(data);
  };

  const filtrarPorNombre = (nombre: string) => {
    setBusqueda(nombre);
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Filtrar Productos
      </h1>

      {/* Barra de búsqueda */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => filtrarPorNombre(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botones de categorías */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={cargarTodos}
          className={`px-4 py-2 rounded-full border font-medium transition ${
            categoriaSeleccionada === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Todos
        </button>

        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => filtrarPorCategoria(cat)}
            className={`px-4 py-2 rounded-full border font-medium transition ${
              categoriaSeleccionada === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      {productosFiltrados.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {producto.nombre}
              </h2>
              <p className="text-gray-500 text-sm">{producto.categoria}</p>
              <p className="text-blue-600 font-bold mt-2">
                S/. {producto.precio.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Stock: {producto.stock}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No se encontraron productos.
        </p>
      )}
    </div>
  );
}
