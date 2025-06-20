import { Plus, Sun, Moon } from "lucide-react";

export default function Navbar({ modoOscuro, setModoOscuro, setFormularioAbierto }) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lista de Deseos 🎁</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setFormularioAbierto(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus size={20} /> Añadir Deseo
        </button>

        <button
          onClick={() => setModoOscuro(!modoOscuro)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition"
        >
          {modoOscuro ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
        </button>
      </div>
    </nav>
  );
}
