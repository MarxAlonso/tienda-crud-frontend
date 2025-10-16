interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

interface Props {
  productos: Producto[];
  onEdit: (p: Producto) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ productos, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Precio</th>
          <th className="p-2 border">Stock</th>
          <th className="p-2 border">Categoría</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td className="p-2 border">{p.id}</td>
            <td className="p-2 border">{p.nombre}</td>
            <td className="p-2 border">S/{p.precio}</td>
            <td className="p-2 border">{p.stock}</td>
            <td className="p-2 border">{p.categoria}</td>
            <td className="p-2 border space-x-2">
              <button
                onClick={() => onEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(p.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
