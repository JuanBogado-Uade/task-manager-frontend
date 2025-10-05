"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const router = useRouter();
  const { setUserName } = useUser();

  async function handleLogin(formData: FormData) {
    if (bloqueado) {
      setError("Demasiados intentos fallidos. Intenta más tarde.");
      return;
    }

    const correo = formData.get("correo");
    const contraseña = formData.get("contraseña");

    const res = await fetch("https://task-manager-backend-s4ys.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.log("Error al iniciar sesión:", errorMessage);
      if (
        errorMessage.toLowerCase().includes("contraseña incorrecta") ||
        errorMessage.toLowerCase().includes("usuario no encontrado")
      ) {
        setIntentos((prev) => {
          const nuevosIntentos = prev + 1;
          if (nuevosIntentos >= 4) {
            setBloqueado(true);
            setError("Demasiados intentos fallidos. Intenta más tarde.");
          } else {
            setError(
              errorMessage.toLowerCase().includes("contraseña incorrecta")
                ? "Contraseña incorrecta"
                : "Usuario no encontrado"
            );
          }
          return nuevosIntentos;
        });
      } else {
        setError("Error al iniciar sesión");
      }
      return;
    }

    // Login exitoso: reiniciar intentos y limpiar error
    setIntentos(0);
    setBloqueado(false);
    setError("");

    const result = await res.json();
    setUserName(result.usuario);
    router.push("/dashboard");
  }

  // Limpiar error al escribir en los inputs
  function handleInputChange() {
    if (error) setError("");
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
          disabled={bloqueado}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          className="border rounded px-3 py-2"
          required
          disabled={bloqueado}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={bloqueado}
        >
          Iniciar sesión
        </button>
        {intentos > 0 && !bloqueado && (
          <p className="text-orange-600 text-center mt-2">
            Intentos fallidos: {intentos} / 4
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mt-2">{error}</p>
        )}
      </form>
      <div className="mt-6 flex flex-col items-center gap-2">
        <p>
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-blue-600 underline hover:text-blue-800">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}