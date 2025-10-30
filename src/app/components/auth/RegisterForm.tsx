"use client";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { esContraseñaSegura } from "@/utils/validaciones";

interface RegisterFormProps {
  lang: "ar" | "br";
  onSuccess?: () => void;
}

const translations = {
  ar: {
    email: "Correo electrónico",
    username: "Nombre de usuario",
    password: "Contraseña",
    register: "Registrarme",
    registering: "Registrando...",
    success: "¡Registro exitoso!",
    successDesc: "Ahora puedes iniciar sesión con tus credenciales.",
    passwordReq:
      "La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.",
    connectionError: "Error de conexión. Inténtalo nuevamente.",
  },
  br: {
    email: "E-mail",
    username: "Nome de usuário",
    password: "Senha",
    register: "Registrar-se",
    registering: "Registrando...",
    success: "Registro bem-sucedido!",
    successDesc: "Agora você pode entrar com suas credenciais.",
    passwordReq:
      "A senha deve ter entre 8 e 20 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial.",
    connectionError: "Erro de conexão. Tente novamente.",
  },
};

export default function RegisterForm({ lang, onSuccess }: RegisterFormProps) {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    try {
      const res = await fetch(
        "https://task-manager-backend-s4ys.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );

      if (!res.ok) {
        setLoading(false);
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || t.connectionError;
        setError(errorMessage);
        return;
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch {
      setError(t.connectionError);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">{t.success}</h1>
        <p className="mb-6 text-gray-700">{t.successDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2">
      <label htmlFor="correo" className="text-sm font-medium text-gray-700">
        {t.email}
      </label>
      <input
        name="correo"
        type="email"
        placeholder={t.email}
        required
        value={formData.correo}
        onChange={handleInputChange}
        disabled={loading}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
        {t.username}
      </label>
      <input
        name="nombre"
        type="text"
        placeholder={t.username}
        required
        value={formData.nombre}
        onChange={handleInputChange}
        disabled={loading}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <PasswordInput
        id="contraseña"
        name="contraseña"
        placeholder={t.password}
        disabled={loading}
        required
        value={formData.contraseña}
        onChange={handleInputChange}
      />
      <small className="text-gray-500 text-sm">{t.passwordReq}</small>

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white p-2 rounded-lg transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? t.registering : t.register}
      </button>

      {error && <p className="text-red-600 text-center text-sm">{error}</p>}
    </form>
  );
}
