"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [intentos, setIntentos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);
    const router = useRouter();
    const { setUserName } = useUser();

    async function handleLogin(formData: FormData) {
        if (bloqueado) return setError("Demasiados intentos fallidos. Intenta más tarde.");

        setLoading(true);
        const correo = formData.get("correo");
        const contraseña = formData.get("contraseña");

        try {
            const res = await fetch("https://task-manager-backend-s4ys.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, contraseña }),
            });

            if (!res.ok) {
                setLoading(false);
                const errorResponse = await res.json(); // Parsear el JSON de la respuesta
                const errorMessage = errorResponse.error || "Error desconocido"; // Extraer el mensaje de error
                return handleLoginError(errorMessage);
            }

            const result = await res.json();
            setUserName(result.usuario);
            router.push("/dashboard");
        } catch (err) {
            setError("Error de conexión. Intenta nuevamente.");
            setLoading(false);
        }
    }

    function handleLoginError(message: string) {
        setIntentos((prev) => prev + 1);
        if (intentos + 1 >= 3) {
            setBloqueado(true);
            // Ver como lo hace el back
            setTimeout(() => setBloqueado(false), 30000);
        }
        setError(message);
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleLogin(formData);
            }}
            className="flex flex-col gap-4"
        >
            {/* Campo de correo electrónico */}
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                Correo electrónico
            </label>
            <input
                id="correo"
                name="correo"
                type="email"
                placeholder="Ejemplo@uade.com"
                required
                disabled={loading} // Deshabilitado si loading es true
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
            />

            {/* Campo de contraseña */}
            <PasswordInput
                id="contraseña"
                name="contraseña"
                placeholder="Introduce tu contraseña"
                disabled={loading} // Deshabilitado si loading es true
                required
            />

            {/* Botón de envío */}
            <button
                type="submit"
                disabled={loading} // Deshabilitado si loading es true
                className={`bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
            >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

            {/* Mensaje de error */}
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
    );
}