"use client";

import Link from "next/link";
import { useState } from "react";
import LoginForm from "@/app/components/auth/LoginForm";
import Header from "@/app/components/Header";

const translations = {
  ar: {
    title: "Iniciar sesión",
    subtitle: "Introduce tus credenciales para acceder a tu cuenta",
    noAccount: "¿No tenes cuenta?",
    registerHere: "Regístrate acá",
    forgotPassword: "¿Olvidaste tu contraseña?",
    resetHere: "Restablecela acá",
    login: "Iniciar sesión",
    register: "Registro",
  },
  br: {
    title: "Entrar",
    subtitle: "Insira suas credenciais para acessar sua conta",
    noAccount: "Não tem conta?",
    registerHere: "Cadastre-se aqui",
    forgotPassword: "Esqueceu sua senha?",
    resetHere: "Redefina aqui",
    login: "Entrar",
    register: "Registro",
  },
};

export default function LoginPage() {
  const [lang, setLang] = useState<"ar" | "br">("ar");
  const t = translations[lang];

  return (
    <>
      <Header lang={lang} setLang={setLang} t={{ login: t.login, register: t.register }} />

      <main className="min-h-screen flex items-center justify-center bg-avocado-200 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-gray-600 mt-2">{t.subtitle}</p>
          </header>

          <LoginForm lang={lang} />

          <footer className="mt-6 text-center">
            <p className="text-gray-700">
              {t.noAccount}{" "}
              <Link href="/register" className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition">
                {t.registerHere}
              </Link>
            </p>
            <p>
              {t.forgotPassword}{" "}
              <Link href="/reset" className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition">
                {t.resetHere}
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
