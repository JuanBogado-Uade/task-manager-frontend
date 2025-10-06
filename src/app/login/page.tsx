"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserName } = useUser();

  async function handleLogin(formData: FormData) {
    if (bloqueado) {
      setError("Demasiados intentos fallidos. Intenta más tarde.");
      return;
    }
    setLoading(true); 
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

    // Login exitoso
    setLoading(false);
    setIntentos(0);
    setBloqueado(false);
    setError("");

    const result = await res.json();
    setUserName(result.usuario);
    router.push("/dashboard");
  }

  function handleInputChange() {
    if (error) setError("");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-avocado-200 p-6">
      <div className="bg-white backdrop-blur-sm border border-white/50 shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform ">
        {/* Header */}
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Iniciar sesión</h2>
          <p className="text-gray-600 mt-2">
            Introduce tus credenciales para acceder a tu cuenta
          </p>
        </header>

        {/* Formulario */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            await handleLogin(formData);
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="correo"
              placeholder="ejemplo@correo.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 placeholder:italic"
              required
              disabled={bloqueado}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="contraseña"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="contraseña"
              type="password"
              name="contraseña"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 placeholder:italic"
              required
              disabled={bloqueado}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
              bloqueado
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
            }`}
            disabled={bloqueado}
          >
      {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>

        {/* Mensajes */}
        {intentos > 0 && !bloqueado && (
          <p className="text-orange-600 text-center mt-4">
            Intentos fallidos: {intentos} / 4
          </p>
        )}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-gray-700">
            ¿No teenes cuenta?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              Regístrate aca
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}