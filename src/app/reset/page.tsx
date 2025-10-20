"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/app/components/auth/PasswordInput";
import { esContraseñaSegura } from "@/utils/validaciones";

export default function ResetPasswordPage() {
  const [correo, setCorreo] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API = "https://task-manager-backend-s4ys.onrender.com";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!correo) {
      return setError("Por favor, ingresa tu correo.");
    }

    if (nuevaContraseña !== confirmarContraseña) {
      return setError("Las contraseñas no coinciden.");
    }

    const errorContraseña = esContraseñaSegura(nuevaContraseña);
    if (errorContraseña) {
      setError(errorContraseña);
      setLoading(false);
      return ;
    }
    setLoading(true);

    try {
      const res = await fetch(`${API}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo,
          nueva_contraseña: nuevaContraseña,
          token: ""
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Error al actualizar la contraseña.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-avocado-200">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-green-700 mb-3">
            Contraseña actualizada
          </h2>
          <p className="text-gray-700 mb-4">
            Ya puedes iniciar sesión con tu nueva contraseña.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Ir al login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-avocado-200">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Recuperar contraseña
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Correo electrónico */}
          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="correo"
              type="email"
              name="correo"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:italic"
            />
          </div>

          {/* Nueva contraseña */}
          <PasswordInput
            id="nueva-contraseña"
            name="nueva-contraseña"
            placeholder="Nueva contraseña"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            disabled={loading}
            required
          />

          {/* Confirmar contraseña */}
          <PasswordInput
            id="confirmar-contraseña"
            name="confirmar-contraseña"
            placeholder="Confirmar contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            disabled={loading}
            required
          />

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}