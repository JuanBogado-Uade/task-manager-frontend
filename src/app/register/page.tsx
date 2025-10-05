"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const formData = new FormData(e.target);
    const correo = formData.get("correo");
    const nombre = formData.get("nombre");
    const contraseña = formData.get("contraseña");

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
    e.target.reset();
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
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Registrarme
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </main>
  );
}