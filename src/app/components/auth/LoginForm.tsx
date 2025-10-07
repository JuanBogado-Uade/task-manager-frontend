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

        const res = await fetch("https://task-manager-backend-s4ys.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contraseña }),
        });

        if (!res.ok) {
            setLoading(false);
            const errorMessage = await res.text();
            return handleLoginError(errorMessage);
        }

        const result = await res.json();
        setUserName(result.usuario);
        router.push("/dashboard");
    }

    function handleLoginError(errorMessage: string) {
        if (
            errorMessage.toLowerCase().includes("contraseña incorrecta") ||
            errorMessage.toLowerCase().includes("usuario no encontrado")
        ) {
            setIntentos((prev) => {
                const nuevos = prev + 1;
                if (nuevos >= 4) setBloqueado(true);
                return nuevos;
            });
            setError(
                errorMessage.toLowerCase().includes("contraseña incorrecta")
                    ? "Contraseña incorrecta"
                    : "Usuario no encontrado"
            );
        } else {
            setError("Error al iniciar sesión");
        }
    }

    return (

        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleLogin(formData);
            }}
            className="space-y-5"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                </label>
                <input
                    name="correo"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    disabled={bloqueado}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
            </div>

            <PasswordInput disabled={bloqueado} />

            <button
                type="submit"
                className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${bloqueado
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
                    }`}
                disabled={bloqueado}
            >
                {loading ? "Iniciando..." : "Iniciar sesión"}
            </button>

            {error && <p className="text-red-600 text-center">{error}</p>}
            {intentos > 0 && !bloqueado && (
                <p className="text-orange-600 text-center">Intentos fallidos: {intentos}/4</p>
            )}
        </form>
    );
}