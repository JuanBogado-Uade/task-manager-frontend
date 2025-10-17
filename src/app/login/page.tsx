"use client";
import LoginForm from "@/app/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-avocado-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Iniciar sesión</h2>
          <p className="text-gray-600 mt-2">
            Introduce tus credenciales para acceder a tu cuenta
          </p>
        </header>
        <LoginForm />
               <footer className="mt-6 text-center">
          <p className="text-gray-700">
            ¿No tenes cuenta?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              Regístrate aca
            </Link>
          </p>
          <p>
            ¿Olvidaste tu contraseña?{" "}
            <Link
              href="/reset"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              Restablecela aca
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}