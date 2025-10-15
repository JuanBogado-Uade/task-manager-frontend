"use client";
import Link from "next/link";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-avocado-200 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registro
        </h1>
        <RegisterForm />
        <div className="text-center mt-6">
          <p className="text-gray-700">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              Ingresa aquí
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}