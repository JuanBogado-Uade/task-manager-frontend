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

    // Validación de contraseña segura
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
      <main className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4 text-green-700">¡Registro exitoso!</h1>
        <p className="mb-6 text-center">Ahora puedes iniciar sesión con tus credenciales.</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => router.push("/login")}
        >
          Ir al login
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          required
          className="border p-2 rounded"
        />
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          required
          className="border p-2 rounded"
        />
        <input
          name="contraseña"
          type="password"
          placeholder="Contraseña"
          required
          className="border p-2 rounded"
          minLength={8}
          maxLength={20}
        />
        <small className="text-gray-500">
          La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.
        </small>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Registrarme
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
      <div>
          <p>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-600 underline hover:text-blue-800">
            Ingresa
          </Link>
        </p>
      </div>
    </main>
  );
}