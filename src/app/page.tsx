import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-avocado-200 p-6">
      <section className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-white/40">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Bienvenido al{" "}
          <span className="text-emerald-700">Task Manager</span>
          <br />
          <span className="text-gray-600 text-lg sm:text-xl">UADE Mineros</span>
        </h1>

        <p className="text-gray-600 mt-4">
          Administra tus tareas y proyectos de forma eficiente.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all hover:bg-blue-700 hover:scale-105"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all hover:bg-emerald-700 hover:scale-105"
          >
            Registrarse
          </Link>
        </div>
      </section>
    </main>
  );
}