"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { esContraseñaSegura } from "@/utils/validaciones";
import Link from "next/link";
import PasswordInput from "../components/auth/PasswordInput";

interface FormData {
  correo: string;
  nombre: string;
  contraseña: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    correo: "",
    nombre: "",
    contraseña: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validar contraseña antes de enviar
    const errorContraseña = esContraseñaSegura(formData.contraseña);
    if (errorContraseña) {
      setLoading(false);
      setError(errorContraseña);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://task-manager-backend-s4ys.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        setError(errorMessage || "Error al registrar usuario");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("Error de conexión. Inténtalo nuevamente.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-avocado-200 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-700">¡Registro exitoso!</h1>
          <p className="mb-6 text-gray-700">
            Ahora puedes iniciar sesión con tus credenciales.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            onClick={() => router.push("/login")}
          >
            Ir al login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-avocado-200 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registro
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-2" >
          {/* Campo de correo electrónico */}
          <label
            htmlFor="correo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            name="correo"
            type="email"
            placeholder="Ejemplo@uade.com"
            required
            autoComplete="off"
            aria-autocomplete="none"
            value={formData.correo}
            onChange={handleInputChange}
            disabled={loading} // Deshabilitado si loading es true
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
          />

          {/* Campo de nombre de usuario */}
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre de usuario
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Steve"
            required
            autoComplete="none"
            aria-autocomplete="none"
            value={formData.nombre}
            onChange={handleInputChange}
            disabled={loading} // Deshabilitado si loading es true
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
          />

          {/* Campo de contraseña */}
          <PasswordInput
            id="contraseña"
            name="contraseña"
            placeholder="Introduce tu contraseña"
            disabled={loading} // Deshabilitado si loading es true
            required={true}
            value={formData.contraseña}
            onChange={handleInputChange}
          />
          <small className="text-gray-500 text-sm">
            La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.
          </small>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading} // Deshabilitado si loading es true
            className={`bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>

          {/* Mensaje de error */}
          {error && (
            <p className="text-red-600 text-center text-sm mt-2">{error}</p>
          )}
        </form>

        {/* Enlace para redirigir al login */}
        <div className="text-center mt-6">
          <p className="text-gray-700">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              Ingresa aquí
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}