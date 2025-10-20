"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
// import ReCAPTCHA from "react-google-recaptcha";
import { useProyectoStore } from "@/store/proyectosStore";

// Declaración global para tipado de grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
      reset: () => void;
    };
  }
}

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const router = useRouter();

  const login = useProyectoStore((state) => state.login);
  const setCurrentUser = useProyectoStore((state) => state.setCurrentUser);

  async function handleLogin(formData: FormData) {
    if (bloqueado) {
      setError("Demasiados intentos fallidos. Intenta más tarde.");
      return;
    }

    setLoading(true);
    setError("");

    const correo = formData.get("correo") as string;
    const contraseña = formData.get("contraseña") as string;

    try {
      // Llamamos al store directamente
      await login(correo, contraseña);

      // Si login fue exitoso, obtenemos el user desde el store
      const user = useProyectoStore.getState().currentUser;
      setCurrentUser(user.usuario);
      console.log(user);
      
      if (!user) {
        setError("Error al obtener datos del usuario.");
        setLoading(false);
        return;
      }

      console.log("Usuario autenticado:", user);
      router.push("/dashboard");
    } catch{
      handleLoginError("Error desconocido");
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

  // useEffect(() => {
  //   console.log("reCAPTCHA siteKey:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  // }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleLogin(formData);
      }}
      className="flex flex-col gap-4"
    >
      <label
        htmlFor="correo"
        className="block text-sm font-medium text-gray-700"
      >
        Correo electrónico
      </label>
      <input
        id="correo"
        name="correo"
        type="email"
        placeholder="Ejemplo@uade.com"
        required
        disabled={loading}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic"
      />

      <PasswordInput
        id="contraseña"
        name="contraseña"
        placeholder="Introduce tu contraseña"
        disabled={loading}
        required
      />

      {/* <ReCAPTCHA
        sitekey={siteKey}
        onChange={() => setCaptchaOk(true)}
        onExpired={() => setCaptchaOk(false)}
      /> */}

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white p-2 rounded-lg transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}