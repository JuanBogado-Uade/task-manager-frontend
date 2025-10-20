import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, BarChart3, Users, Shield, Zap, Clock, Target, Bell } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-avocado-200">
      {/* Header sticky */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-white/30">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="QALogix Logo"
              width={140}
              height={140}
              className="rounded-md object-contain w-24 sm:w-36"
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link
              href="/login"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32">
        <div className="inline-block mb-6 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
          <span className="text-emerald-700 text-sm font-semibold">Gestión de Tareas Empresarial</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 text-balance max-w-4xl">
          Task Manager - <span className="text-emerald-700">QALogix</span>
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
          Optimiza la productividad de tu equipo petrolero con QALogix. Crea proyectos, invita a tu equipo y gestiona
          tareas de manera eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 rounded-lg border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
          >
            Registrarse
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "Eficiencia mejorada", icon: BarChart3 },
              { value: "24/7", label: "Disponibilidad", icon: Clock },
              { value: "500+", label: "Equipos activos", icon: Users },
              { value: "100%", label: "Seguridad garantizada", icon: Shield },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-avocado-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Potencia tu operación petrolera
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
              Herramientas diseñadas específicamente para las necesidades de la industria energética argentina
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              icon={CheckCircle2}
              title="Gestión de Tareas Avanzada"
              desc="Organiza, asigna y monitorea tareas críticas con flujos de trabajo personalizables."
            />
            <Feature
              icon={Users}
              title="Colaboración en Tiempo Real"
              desc="Mantén a tu equipo sincronizado con actualizaciones instantáneas y @menciones."
            />
            <Feature
              icon={BarChart3}
              title="Análisis y Reportes"
              desc="Visualiza el rendimiento operativo con dashboards interactivos y reportes detallados."
            />
            <Feature
              icon={Shield}
              title="Seguridad Empresarial"
              desc="Protección de datos con encriptación end-to-end y cumplimiento normativo."
            />
            <Feature
              icon={Clock}
              title="Seguimiento Temporal"
              desc="Registra tiempos, establece deadlines y optimiza la planificación de recursos."
            />
            <Feature
              icon={Target}
              title="Prioridades y Objetivos"
              desc="Define prioridades claras y alinea tareas con los objetivos estratégicos del equipo."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-avocado-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="QALogix Logo" width={176} height={176} className="rounded object-contain" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Soluciones de gestión de tareas para la industria petrolera argentina
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Características</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Precios</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Seguridad</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Integraciones</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Sobre Nosotros</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Carreras</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Contacto</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Privacidad</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Términos</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Cookies</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Licencias</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-avocado-400 text-center text-sm text-gray-600">
            <p>© 2025 QALogix — Equipo: QAs · PMs · Devs — Cliente: Empresa petrolera argentina</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

import { ElementType } from 'react';

function Feature({ 
  icon: Icon, 
  title, 
  desc 
}: { 
  icon: ElementType; 
  title: string; 
  desc: string 
}) {
  return (
    <div className="flex flex-col items-start gap-3 p-6 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/50">
      <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
