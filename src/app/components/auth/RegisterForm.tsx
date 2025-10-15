"use client";
import { useState, useEffect } from "react";
import PasswordInput from "./PasswordInput";
import { esContraseñaSegura } from "@/utils/validaciones";
import ReCAPTCHA from "react-google-recaptcha"

// Declaración global para TypeScript
declare global {
    interface Window {
        onCaptchaSuccess?: () => void;
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
  const [captchaOk, setCaptchaOk] = useState(false);

  useEffect(() => {
    window.onCaptchaSuccess = () => setCaptchaOk(true);
    return () => {
      delete window.onCaptchaSuccess;
    };
  }, []);

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

    const captchaResponse = (window as any).grecaptcha?.getResponse();
    if (!captchaResponse) {
      setError("Por favor completa el captcha.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://task-manager-backend-s4ys.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captcha: captchaResponse }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        setError(errorMessage || "Error al registrar usuario");
        setLoading(false);
        return;
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Error de conexión. Inténtalo nuevamente.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">¡Registro exitoso!</h1>
        <p className="mb-6 text-gray-700">
          Ahora puedes iniciar sesión con tus credenciales.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2">
      {/* Campo de correo electrónico */}
      <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
        Correo electrónico
      </label>
      <input
        name="correo"
        type="email"
        placeholder="Ejemplo@uade.com"
        required
        autoComplete="off"
        aria-autocomplete="none"
        value={formData.correo}
        onChange={handleInputChange}
        disabled={loading}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
      />

      {/* Campo de nombre de usuario */}
      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
        Nombre de usuario
      </label>
      <input
        name="nombre"
        type="text"
        placeholder="Steve"
        required
        autoComplete="none"
        aria-autocomplete="none"
        value={formData.nombre}
        onChange={handleInputChange}
        disabled={loading}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:italic"
      />

      {/* Campo de contraseña */}
      <PasswordInput
        id="contraseña"
        name="contraseña"
        placeholder="Introduce tu contraseña"
        disabled={loading}
        required={true}
        value={formData.contraseña}
        onChange={handleInputChange}
      />
      <small className="text-gray-500 text-sm">
        La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.
      </small>

      {/* Google reCAPTCHA v2 */}
      <div>
        <ReCAPTCHA
            sitekey="6LeCh-UrAAAAAPk1PiqMukSheTLkNDe_PVbSreWG"
            onChange={() => setCaptchaOk(true)}
            onExpired={() => setCaptchaOk(false)}
        />

      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={loading || !captchaOk}
        className={`bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 ${
          loading || !captchaOk ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? "Registrando..." : "Registrarme"}
      </button>

      {/* Mensaje de error */}
      {error && (
        <p className="text-red-600 text-center text-sm mt-2">{error}</p>
      )}
    </form>
  );
}