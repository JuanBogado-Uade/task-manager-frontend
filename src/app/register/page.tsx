"use client";

import Link from "next/link";
import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import Header from "../components/Header";

const translations = {
  ar: { title: "Registro", alreadyHaveAccount: "¿Ya tienes cuenta?", loginHere: "Ingresa aquí", login: "Iniciar sesión", register: "Registro" },
  br: { title: "Registro", alreadyHaveAccount: "Já tem uma conta?", loginHere: "Entre aqui", login: "Entrar", register: "Registro" },
};

export default function RegisterPage() {
  const [lang, setLang] = useState<"ar" | "br">("ar");
  const t = translations[lang];

  return (
    <>
      <Header lang={lang} setLang={setLang} t={{ login: t.login, register: t.register }} />

      <main className="flex min-h-screen items-center justify-center bg-avocado-200 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{t.title}</h1>

          <RegisterForm lang={lang} />

          <div className="text-center mt-6">
            <p className="text-gray-700">
              {t.alreadyHaveAccount}{" "}
              <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition">
                {t.loginHere}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
