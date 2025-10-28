import { useState } from "react";

const API_URL = "https://task-manager-backend-1-ybye.onrender.com";
interface AgregarIntegranteProps {
  proyectoId: number;
  user: {
    correo: string;
  };
  onClose: () => void;
}
interface Integrante {
  correo: string;
  rol: "lector" | "editor";
}

export default function AgregarIntegrante({ proyectoId , user, onClose }: AgregarIntegranteProps) { 
  // -----------------------------
  // 🧩 Estados locales
  // -----------------------------
  const [integrantes, setIntegrantes] = useState([{ correo: "", rol: "lector" }]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // -----------------------------
  // ➕ Agregar nuevo campo
  // -----------------------------
  const handleAddField = () => {
    setIntegrantes([...integrantes, { correo: "", rol: "lector" }]);
  };

  // -----------------------------
  // ❌ Eliminar campo
  // -----------------------------
  const handleRemoveField = (index: number) => {
    const nuevos = integrantes.filter((_, i) => i !== index);
    setIntegrantes(nuevos);
  };

  // -----------------------------
  // ✏️ Actualizar valores de correo o rol
  // -----------------------------
  const handleChange = (index: number, field: keyof Integrante, value: string): void => {
    const nuevos = [...integrantes];
    nuevos[index][field] = value as never;
    setIntegrantes(nuevos);
  };

  // -----------------------------
  // 📤 Enviar datos al backend
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      const mapping: Record<string, string> = {};
      integrantes.forEach((i) => {
        if (i.correo.trim()) mapping[i.correo.trim()] = i.rol;
      });

      const res = await fetch(`${API_URL}/proyectos/${proyectoId}/integrantes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-mail": user.correo, // Mail del usuario autenticado
        },
        body: JSON.stringify(mapping),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ Integrantes agregados exitosamente");
        setIntegrantes([{ correo: "", rol: "lector" }]);

        // 🔹 Cierra el modal automáticamente tras éxito
        setTimeout(() => {
          onClose?.();
        }, 1000);
      } else {
        setMensaje(`❌ Error: ${data.error || "Ocurrió un error"}`);
      }
    } catch (err) {
      setMensaje("⚠️ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // 🧱 Render del componente
  // -----------------------------
return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    {/* Contenedor principal */}
    <div className="w-full max-w-md bg-lime-50 shadow-2xl rounded-2xl p-6 relative border border-lime-200">
      {/* ❌ Botón de cerrar */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-lime-600 hover:text-lime-800 text-xl font-bold"
      >
        ×
      </button>

      <h2 className="text-xl font-semibold mb-4 text-green-800">
        Agregar integrantes
      </h2>

      {/* 🧾 Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {integrantes.map((integrante, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-2 items-center"
          >
            <input
              type="email"
              placeholder="Correo del integrante"
              value={integrante.correo}
              onChange={(e) => handleChange(index, 'correo', e.target.value)}
              required
              className="flex-1 border border-lime-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
            />

            <select
              value={integrante.rol}
              onChange={(e) => handleChange(index, 'rol', e.target.value)}
              className="border border-lime-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white w-full sm:w-auto"
            >
              <option value="lector">Lector</option>
              <option value="editor">Editor</option>
            </select>

            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="text-rose-500 hover:text-rose-600 font-bold text-lg"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* ➕ Agregar más campos */}
        <button
          type="button"
          onClick={handleAddField}
          className="text-lime-700 text-sm underline hover:text-lime-900"
        >
          + Agregar otro integrante
        </button>

        {/* 🚀 Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Agregando...' : 'Agregar integrantes'}
        </button>
      </form>

      {/* 🗨️ Mensaje de feedback */}
      {mensaje && (
        <p
          className={`mt-4 text-sm text-center ${
            mensaje.startsWith('✅')
              ? 'text-green-600'
              : mensaje.startsWith('⚠️')
              ? 'text-yellow-600'
              : 'text-rose-600'
          }`}
        >
          {mensaje}
        </p>
      )}
    </div>
  </div>
);
}
