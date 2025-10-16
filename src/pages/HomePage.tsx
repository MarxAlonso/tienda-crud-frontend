import React, { useEffect, useState } from "react";
import { getProductos } from "../services/api";

interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductos();
        setProductos(data.slice(0, 3)); // Muestra solo los 3 primeros productos
      } catch (err) {
        setError("No se pudieron cargar los productos. Verifica el backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          📦 Tienda - Integración Frontend ↔ Backend
        </h1>
        <p className="text-gray-600">
          Este proyecto demuestra cómo conectar un <strong>frontend React</strong> con un{" "}
          <strong>backend Node.js + SQLite</strong> mediante una API REST.
        </p>
      </header>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3">🔍 ¿Qué encontrarás aquí?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Frontend modular con componentes y servicios API.</li>
          <li>Backend Node.js con Express que expone endpoints CRUD.</li>
          <li>Ejemplos de métodos HTTP: GET, POST, PUT, DELETE.</li>
          <li>Buenas prácticas con CORS, manejo de errores y estado.</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">🧭 Arquitectura del proyecto</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Frontend</h3>
            <p className="text-sm text-gray-600">
              Desarrollado en <code>React + Vite + Tailwind</code>. Los componentes{" "}
              <code>ProductForm</code> y <code>ProductTable</code> usan{" "}
              <strong>axios</strong> para consumir la API.
            </p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Backend</h3>
            <p className="text-sm text-gray-600">
              Desarrollado en <code>Node.js + Express + SQLite</code>. Expone endpoints REST
              en <code>/productos</code> para crear, leer, actualizar y eliminar registros.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">🔁 Comunicación entre frontend y backend</h2>
        <p className="text-gray-700 mb-3">
          La comunicación se realiza mediante peticiones HTTP. A continuación algunos ejemplos:
        </p>

        <div className="space-y-4">
          <article className="p-4 border rounded">
            <h4 className="font-medium">GET — Obtener productos</h4>
            <pre className="bg-gray-100 rounded p-2 mt-2 text-sm overflow-auto">
              <code>GET http://localhost:3000/productos</code>
            </pre>
          </article>

          <article className="p-4 border rounded">
            <h4 className="font-medium">POST — Crear un producto</h4>
            <pre className="bg-gray-100 rounded p-2 mt-2 text-sm overflow-auto">
              <code>
                POST http://localhost:3000/productos{"\n"}
                Content-Type: application/json{"\n\n"}
                {"{ \"nombre\": \"Laptop\", \"precio\": 2500, \"stock\": 5, \"categoria\": \"Tecnología\" }"}
              </code>
            </pre>
          </article>

          <article className="p-4 border rounded">
            <h4 className="font-medium">PUT — Actualizar un producto</h4>
            <pre className="bg-gray-100 rounded p-2 mt-2 text-sm overflow-auto">
              <code>PUT http://localhost:3000/productos/:id</code>
            </pre>
          </article>

          <article className="p-4 border rounded">
            <h4 className="font-medium">DELETE — Eliminar un producto</h4>
            <pre className="bg-gray-100 rounded p-2 mt-2 text-sm overflow-auto">
              <code>DELETE http://localhost:3000/productos/:id</code>
            </pre>
          </article>
        </div>
      </section>

      {/* 🔹 Widget Interactivo */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">🧩 Vista rápida de productos (desde la API)</h2>

        {loading && <p className="text-gray-500">Cargando productos...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productos.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-blue-700">{p.nombre}</h3>
                <p className="text-gray-700 mt-1">💰 Precio: S/{p.precio}</p>
                <p className="text-gray-700">📦 Stock: {p.stock}</p>
                <p className="text-gray-600 text-sm mt-1">
                  🏷️ Categoría: {p.categoria}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading && productos.length === 0 && !error && (
          <p className="text-gray-500 text-center mt-2">
            No hay productos disponibles en la base de datos.
          </p>
        )}
      </section>

      {/* 🧠 Instrucciones del backend */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3">⚙️ Configurar el Backend</h2>
        <p className="text-gray-700 mb-3">
          Para que este proyecto funcione correctamente, necesitas clonar y ejecutar el
          servidor backend desarrollado en Node.js. Este servidor gestiona las operaciones
          CRUD y la base de datos SQLite.
        </p>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
          <code>
            # Clonar el repositorio del backend{"\n"}
            git clone https://github.com/MarxAlonso/api-crud-sqlite.git{"\n\n"}
            # Entrar al proyecto{"\n"}
            cd api-crud-sqlite{"\n\n"}
            # Instalar dependencias{"\n"}
            npm install{"\n\n"}
            # Iniciar el servidor{"\n"}
            npm run dev
          </code>
        </pre>

        <p className="mt-4 text-gray-700">
          🔗 Repositorio del backend en GitHub:{" "}
          <a
            href="https://github.com/MarxAlonso/api-crud-sqlite.git"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            github.com/MarxAlonso/api-crud-sqlite
          </a>
        </p>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-8">
        Hecho por Marx Chipana — Documentación interactiva del flujo <strong>Frontend → Backend</strong>.
      </footer>
    </div>
  );
}
