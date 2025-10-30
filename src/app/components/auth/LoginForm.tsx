"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
import { useProyectoStore } from "@/store/proyectosStore";

interface LoginFormProps {
  lang: "ar" | "br"; // recibiendo idioma
}

declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
      reset: () => void;
    };
  }
}

const translations = {
  ar: {
    email: "Correo electrónico",
    password: "Contraseña",
    login: "Iniciar sesión",
    loggingIn: "Iniciando sesión...",
    blocked: "Demasiados intentos fallidos. Intenta más tarde.",
    unknownError: "Error desconocido",
  },
  br: {
    email: "E-mail",
    password: "Senha",
    login: "Entrar",
    loggingIn: "Entrando...",
    blocked: "Muitas tentativas falharam. Tente novamente mais tarde.",
    unknownError: "Erro desconhecido",
  },
};

export default function LoginForm({ lang }: LoginFormProps) {
  const t = translations[lang];

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const router = useRouter();

  const login = useProyectoStore((state) => state.login);
  const setCurrentUser = useProyectoStore((state) => state.setCurrentUser);

  async function handleLogin(formData: FormData) {
    if (bloqueado) {
      setError(t.blocked);
      return;
    }

    setLoading(true);
    setError("");

    const correo = formData.get("correo") as string;
    const contraseña = formData.get("contraseña") as string;

    try {
      await login(correo, contraseña);

      const user = useProyectoStore.getState().currentUser;
      setCurrentUser(user);

      if (!user) {
        setError(t.unknownError);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      handleLoginError(t.unknownError);
    } finally {
      setLoading(false);
    }
  }

  function handleLoginError(message: string) {
    setIntentos((prev) => prev + 1);
    if (intentos + 1 >= 3) {
      setBloqueado(true);
      setTimeout(() => setBloqueado(false), 30000); // Bloqueo 30s
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
      <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
        {t.email}
      </label>
      <input
        id="correo"
        name="correo"
        type="email"
        placeholder={t.email}
        required
        disabled={loading}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic"
      />

      <PasswordInput
        id="contraseña"
        name="contraseña"
        placeholder={t.password}
        disabled={loading}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white p-2 rounded-lg transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? t.loggingIn : t.login}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
