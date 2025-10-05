"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserName } = useUser();

  async function handleLogin(formData: FormData) {
    setError(""); 

    const correo = formData.get("correo");
    const contraseña = formData.get("contraseña");

    const res = await fetch("https://task-manager-backend-s4ys.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });
// TODO: Mejorar manejo de errores
    if (!res.ok) {
      const errorMessage = await res.text();
      console.log("Error al iniciar sesión:", errorMessage);
      if (errorMessage.toLowerCase().includes("contraseña incorrecta")) {
        setError("Contraseña incorrecta");
      } else if (errorMessage.toLowerCase().includes("usuario no encontrado")) {
        setError("Usuario no encontrado");
      } else {
        setError("Error al iniciar sesión");
      }
      return;
    }

    const result = await res.json();
    console.log("Login exitoso:", result);
    setUserName(result.usuario);
    router.push("/dashboard");
  }

  return (
    <form
      action={async (formData) => {
        await handleLogin(formData);
      }}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-20"
    >
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        className="border rounded px-3 py-2"
        required
      />
      <input
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        className="border rounded px-3 py-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Iniciar sesión
      </button>
      {error && (
        <p className="text-red-600 text-center mt-2">{error}</p>
      )}
    </form>
  );
}