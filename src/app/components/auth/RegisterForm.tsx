"use client";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { esContraseñaSegura } from "@/utils/validaciones";
// import ReCAPTCHA from "react-google-recaptcha";

// Declaración global para tipado de grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
      reset: () => void;
    };
  }
}

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // const [captchaOk, setCaptchaOk] = useState(false);

  // const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const errorContraseña = esContraseñaSegura(formData.contraseña);
    if (errorContraseña) {
      setError(errorContraseña);
      setLoading(false);
      return;
    }

    // Obtener el token del captcha
    // const captchaResponse = window.grecaptcha?.getResponse() ?? "";
    // if (!captchaResponse) {
    //   setError("Por favor completa el captcha.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const res = await fetch(
        "https://task-manager-backend-s4ys.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData}),
        }
      );

      if (!res.ok) {
        setLoading(false);
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Error desconocido";
        setError(errorMessage);
        return;
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch {
      setError("Error de conexión. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          ¡Registro exitoso!
        </h1>
        <p className="mb-6 text-gray-700">
          Ahora puedes iniciar sesión con tus credenciales.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2">
      <label htmlFor="correo" className="text-sm font-medium text-gray-700">
        Correo electrónico
      </label>
      <input
        name="correo"
        type="email"
        placeholder="Ejemplo@uade.com"
        required
        value={formData.correo}
        onChange={handleInputChange}
        disabled={loading}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
        Nombre de usuario
      </label>
      <input
        name="nombre"
        type="text"
        placeholder="Steve"
        required
        value={formData.nombre}
        onChange={handleInputChange}
        disabled={loading}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <PasswordInput
        id="contraseña"
        name="contraseña"
        placeholder="Introduce tu contraseña"
        disabled={loading}
        required
        value={formData.contraseña}
        onChange={handleInputChange}
      />
      <small className="text-gray-500 text-sm">
        La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.
      </small>

      {/* <ReCAPTCHA
        sitekey={siteKey}
        onChange={() => setCaptchaOk(true)}
        onExpired={() => setCaptchaOk(false)}
      /> */}

      <button
        type="submit"
        disabled={loading }
        className={`bg-blue-600 text-white p-2 rounded-lg transition ${
          loading  ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? "Registrando..." : "Registrarme"}
      </button>

      {error && <p className="text-red-600 text-center text-sm">{error}</p>}
    </form>
  );
}
