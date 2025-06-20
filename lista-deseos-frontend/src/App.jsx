import { useState } from "react";
import Navbar from "./components/Navbar";
import Deseos from "./components/Deseos";

export default function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  return (
    <div className={modoOscuro ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        
        {/* Navbar arriba */}
        <Navbar modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} setFormularioAbierto={setFormularioAbierto} />

        {/* Lista de deseos y modal */}
        <main className="container mx-auto p-4">
          <Deseos formularioAbierto={formularioAbierto} setFormularioAbierto={setFormularioAbierto} />
        </main>
      </div>
    </div>
  );
}