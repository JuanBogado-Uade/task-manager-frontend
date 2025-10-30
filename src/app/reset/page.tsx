"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/app/components/auth/PasswordInput";
import Header from "@/app/components/Header";
import { esContraseñaSegura } from "@/utils/validaciones";

const translations = {
  ar: { title: "Recuperar contraseña", emailLabel: "Correo electrónico", emailPlaceholder: "ejemplo@correo.com", newPassword: "Nueva contraseña", confirmPassword: "Confirmar contraseña", updatePassword: "Actualizar contraseña", updating: "Actualizando...", successTitle: "Contraseña actualizada", successMsg: "Ya puedes iniciar sesión con tu nueva contraseña.", goLogin: "Ir al login", login: "Iniciar sesión", register: "Registro", errors: { noEmail: "Por favor, ingresa tu correo.", mismatch: "Las contraseñas no coinciden.", server: "Error de conexión con el servidor.", update: "Error al actualizar la contraseña." } },
  br: { title: "Recuperar senha", emailLabel: "E-mail", emailPlaceholder: "exemplo@correo.com", newPassword: "Nova senha", confirmPassword: "Confirmar senha", updatePassword: "Atualizar senha", updating: "Atualizando...", successTitle: "Senha atualizada", successMsg: "Você já pode fazer login com sua nova senha.", goLogin: "Ir para o login", login: "Entrar", register: "Registro", errors: { noEmail: "Por favor, insira seu e-mail.", mismatch: "As senhas não coincidem.", server: "Erro de conexão com o servidor.", update: "Erro ao atualizar a senha." } },
};

export default function ResetPasswordPage() {
  const [lang, setLang] = useState<"ar" | "br">("ar");
  const t = translations[lang];

  const [correo, setCorreo] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API = "https://task-manager-backend-s4ys.onrender.com";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!correo) return setError(t.errors.noEmail);
    if (nuevaContraseña !== confirmarContraseña) return setError(t.errors.mismatch);
    const errorContraseña = esContraseñaSegura(nuevaContraseña);
    if (errorContraseña) return setError(errorContraseña);

    setLoading(true);

    try {
      const res = await fetch(`${API}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, nueva_contraseña: nuevaContraseña, token: "" }),
      });

      if (res.ok) setSuccess(true);
      else {
        const data = await res.json().catch(() => null);
        setError(data?.error || t.errors.update);
      }
    } catch {
      setError(t.errors.server);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <Header lang={lang} setLang={setLang} t={{ login: t.login, register: t.register }} />
        <main className="flex min-h-screen items-center justify-center bg-avocado-200">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
            <h2 className="text-xl font-bold text-green-700 mb-3">{t.successTitle}</h2>
            <p className="text-gray-700 mb-4">{t.successMsg}</p>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {t.goLogin}
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} t={{ login: t.login, register: t.register }} />
      <main className="flex min-h-screen items-center justify-center bg-avocado-200 relative">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">{t.title}</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">{t.emailLabel}</label>
              <input id="correo" type="email" placeholder={t.emailPlaceholder} value={correo} onChange={(e) => setCorreo(e.target.value)} disabled={loading} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:italic" />
            </div>

            <PasswordInput id="nueva-contraseña" name="nueva-contraseña" placeholder={t.newPassword} value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} disabled={loading} required />
            <PasswordInput id="confirmar-contraseña" name="confirmar-contraseña" placeholder={t.confirmPassword} value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} disabled={loading} required />

            <button type="submit" disabled={loading} className={`bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}>
              {loading ? t.updating : t.updatePassword}
            </button>

            {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
          </form>
        </div>
      </main>
    </>
  );
}
