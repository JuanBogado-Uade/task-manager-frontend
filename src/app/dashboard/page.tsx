"use client";
import { useUser } from "../../context/UserContext";

export default function DashboardPage() {
  const { userName } = useUser();
  console.log("userName in DashboardPage:", userName);
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <h1 className="text-3xl font-bold mb-4">¡Hola, {userName}!</h1>
      <p className="text-lg text-gray-700">Bienvenido a tu panel de tareas.</p>
    </main>
  );
}