import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { X, Pencil, Trash2 } from "lucide-react";

export default function Deseos({ formularioAbierto, setFormularioAbierto }) {
  const [deseos, setDeseos] = useState([]);
  const [deseo, setDeseo] = useState({ nombre: "", imagen_url: "", enlace: "", precio: "" });

  useEffect(() => {
    fetchDeseos();
  }, []);

  const fetchDeseos = async () => {
    const res = await fetch("http://localhost:3000/api/deseos");
    const data = await res.json();
    setDeseos(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deseo.nombre) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (deseo.id) {
      await fetch(`http://localhost:3000/api/deseos/${deseo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deseo),
      });
      toast.success("Deseo actualizado! ✅");
    } else {
      await fetch("http://localhost:3000/api/deseos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deseo),
      });
      toast.success("Deseo añadido! 🎉");
    }

    setDeseo({ nombre: "", imagen_url: "", enlace: "", precio: "" });
    setFormularioAbierto(false);
    fetchDeseos();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/deseos/${id}`, { method: "DELETE" });
    toast.error("Deseo eliminado 🗑️");
    fetchDeseos();
  };

  const handleEdit = (deseoEditar) => {
    setDeseo(deseoEditar);
    setFormularioAbierto(true);
  };

  const handleCancel = () => {
    setDeseo({ nombre: "", imagen_url: "", enlace: "", precio: "" });
    setFormularioAbierto(false);
  };

  return (
    <div className="relative">
      {/* FONDO + MODAL */}
      <AnimatePresence>
        {formularioAbierto && (
          <>
            {/* Fondo desenfocado */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={handleCancel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel grande con animación suave */}
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
              <motion.div
                className="bg-white dark:bg-gray-900 w-full max-w-6xl rounded-2xl overflow-auto max-h-[90vh] p-8 relative"
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Botón cerrar */}
                <button
                  onClick={handleCancel}
                  className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition"
                >
                  <X size={32} />
                </button>

                {/* Formulario */}
                <h2 className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white">
                  {deseo.id ? "Editar Deseo" : "Añadir Nuevo Deseo"} 🎁
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del deseo"
                    value={deseo.nombre}
                    onChange={(e) => setDeseo({ ...deseo, nombre: e.target.value })}
                    className="w-full p-4 border rounded-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    name="imagen_url"
                    placeholder="URL de la imagen"
                    value={deseo.imagen_url}
                    onChange={(e) => setDeseo({ ...deseo, imagen_url: e.target.value })}
                    className="w-full p-4 border rounded-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    name="enlace"
                    placeholder="Enlace al producto"
                    value={deseo.enlace}
                    onChange={(e) => setDeseo({ ...deseo, enlace: e.target.value })}
                    className="w-full p-4 border rounded-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <input
                    type="number"
                    step="0.01"
                    name="precio"
                    placeholder="Precio (€)"
                    value={deseo.precio}
                    onChange={(e) => setDeseo({ ...deseo, precio: e.target.value })}
                    className="w-full p-4 border rounded-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-2xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl"
                    >
                      {deseo.id ? "Actualizar" : "Añadir"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* LISTA DE DESEOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {deseos.map((deseo) => (
          <motion.div
            key={deseo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex flex-col justify-between"
          >
            <div>
              {deseo.imagen_url && (
                <img
                  src={deseo.imagen_url}
                  alt={deseo.nombre}
                  className="h-48 w-full object-cover rounded-xl mb-4"
                />
              )}
              <a
                href={deseo.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline mb-2"
              >
                {deseo.nombre}
              </a>
              {deseo.precio && (
                <p className="text-gray-600 dark:text-gray-300">{deseo.precio} €</p>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleEdit(deseo)}
                className="text-yellow-500 hover:text-yellow-600 transition"
              >
                <Pencil size={24} />
              </button>
              <button
                onClick={() => handleDelete(deseo.id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
