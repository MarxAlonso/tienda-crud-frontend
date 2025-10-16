import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-200 shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">🛒 Mi Tienda</h1>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Inicio
        </Link>
        <Link to="/productos" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Productos
        </Link>
        <Link to="/filtrar" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Filtrar Productos
        </Link>
      </div>
    </nav>
  );
}
