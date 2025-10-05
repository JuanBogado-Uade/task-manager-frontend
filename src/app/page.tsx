import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Bienvenido al Task Manager - Uade Mineros</h1>
      <div className="mt-6 space-x-4">
        <Link href="/login" className="text-blue-600 underline">Login</Link>
        <Link href="/register" className="text-green-600 underline">Register</Link>
      </div>
    </main>
  );
}