"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { esContraseñaSegura } from "@/utils/validaciones";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const correo = formData.get("correo")?.toString() || "";
    const nombre = formData.get("nombre")?.toString() || "";
    const contraseña = formData.get("contraseña")?.toString() || "";

    const errorContraseña = esContraseñaSegura(contraseña);
    if (errorContraseña) {
      setError(errorContraseña);
      return;
    }

    const res = await fetch("https://task-manager-backend-s4ys.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, nombre, contraseña }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      setError(errorMessage || "Error al registrar usuario");
      return;
    }

    setSuccess(true);
  }

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

        <form onSubmit={handleRegister} className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            name="correo"
            type="email"
            placeholder="Ejemplo@uade.com"
            required
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
          />
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
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
          />
          <label
            htmlFor="contraseña"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <input
            name="contraseña"
            type="password"
            placeholder="••••••••"
            required
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
            minLength={8}
            maxLength={20}
          />
          <small className="text-gray-500 text-sm">
            La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.
          </small>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Registrarme
          </button>

          {error && (
            <p className="text-red-600 text-center text-sm mt-2">{error}</p>
          )}
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-700">
            ¿Ya tenes cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              Ingresa
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}