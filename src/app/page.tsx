import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-avocado-200">
      {/* Header sticky */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-white/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="QALogixs Logo"
              width={48}
              height={48}
              className="rounded-md object-contain"
            />
            <span className="font-bold text-xl text-gray-900">QALogixs</span>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Task Manager - <span className="text-emerald-700">QALogixs</span>
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto mb-6">
          Optimiza la productividad de tu equipo petrolero con QALogixs. Crea proyectos, invita a tu equipo y gestiona tareas de manera eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
          >
            Registrarse
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-avocado-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Feature title="Proyectos" desc="Crea y organiza proyectos con miembros invitados." />
          <Feature title="Tareas" desc="Asignación, prioridades y seguimiento temporal." />
          <Feature title="Colaboración" desc="Comentarios, @menciones y notificaciones en tiempo real." />
          <Feature title="Seguridad" desc="Protección de datos con estándares empresariales." />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-avocado-300 py-8 mt-16 text-center text-gray-700">
        © 2025 QALogixs — Equipo: QAs · PMs · Devs — Cliente: Empresa petrolera
      </footer>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg shadow-sm">
      <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
        <svg
          className="w-5 h-5 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}
