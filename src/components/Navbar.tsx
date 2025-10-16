export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">🛒 Tienda React</h1>
      <div className="space-x-4">
        <a href="/" className="hover:text-gray-200">Inicio</a>
        <a href="/productos" className="hover:text-gray-200">Productos</a>
      </div>
    </nav>
  );
}
