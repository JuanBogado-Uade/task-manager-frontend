"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CheckCircle2, BarChart3, Users, Shield, Clock, Target } from "lucide-react"
import { ElementType } from "react"

const translations = {
  ar: {
    login: "Iniciar sesión",
    register: "Registrarse",
    badge: "Gestión de Tareas Empresarial",
    heroTitle: "Task Manager - ",
    heroDesc:
      "Optimiza la productividad de tu equipo petrolero con QALogix. Crea proyectos, invita a tu equipo y gestiona tareas de manera eficiente.",
    stats: [
      { value: "98%", label: "Eficiencia mejorada" },
      { value: "24/7", label: "Disponibilidad" },
      { value: "500+", label: "Equipos activos" },
      { value: "100%", label: "Seguridad garantizada" },
    ],
    featuresTitle: "Potencia tu operación petrolera",
    featuresDesc:
      "Herramientas diseñadas específicamente para las necesidades de la industria energética argentina",
    features: [
      {
        icon: CheckCircle2,
        title: "Gestión de Tareas Avanzada",
        desc: "Organiza, asigna y monitorea tareas críticas con flujos de trabajo personalizables.",
      },
      {
        icon: Users,
        title: "Colaboración en Tiempo Real",
        desc: "Mantén a tu equipo sincronizado con actualizaciones instantáneas y @menciones.",
      },
      {
        icon: BarChart3,
        title: "Análisis y Reportes",
        desc: "Visualiza el rendimiento operativo con dashboards interactivos y reportes detallados.",
      },
      {
        icon: Shield,
        title: "Seguridad Empresarial",
        desc: "Protección de datos con encriptación end-to-end y cumplimiento normativo.",
      },
      {
        icon: Clock,
        title: "Seguimiento Temporal",
        desc: "Registra tiempos, establece deadlines y optimiza la planificación de recursos.",
      },
      {
        icon: Target,
        title: "Prioridades y Objetivos",
        desc: "Define prioridades claras y alinea tareas con los objetivos estratégicos del equipo.",
      },
    ],
    footerDesc: "Soluciones de gestión de tareas para la industria petrolera argentina",
    footerProduct: "Producto",
    footerCompany: "Empresa",
    footerLegal: "Legal",
    footerProductLinks: ["Características", "Precios", "Seguridad", "Integraciones"],
    footerCompanyLinks: ["Sobre Nosotros", "Carreras", "Blog", "Contacto"],
    footerLegalLinks: ["Privacidad", "Términos", "Cookies", "Licencias"],
    footerCopyright:
      "© 2025 QALogix — Equipo: QAs · PMs · Devs — Cliente: Empresa petrolera argentina",
  },
  br: {
    login: "Entrar",
    register: "Registrar-se",
    badge: "Gestão de Tarefas Empresarial",
    heroTitle: "Gerenciador de Tarefas - ",
    heroDesc:
      "Otimize a produtividade da sua equipe petrolífera com QALogix. Crie projetos, convide sua equipe e gerencie tarefas de forma eficiente.",
    stats: [
      { value: "98%", label: "Eficiência melhorada" },
      { value: "24/7", label: "Disponibilidade" },
      { value: "500+", label: "Equipes ativas" },
      { value: "100%", label: "Segurança garantida" },
    ],
    featuresTitle: "Potencialize sua operação petrolífera",
    featuresDesc:
      "Ferramentas projetadas especificamente para as necessidades da indústria energética argentina",
    features: [
      {
        icon: CheckCircle2,
        title: "Gestão Avançada de Tarefas",
        desc: "Organize, atribua e monitore tarefas críticas com fluxos de trabalho personalizáveis.",
      },
      {
        icon: Users,
        title: "Colaboração em Tempo Real",
        desc: "Mantenha sua equipe sincronizada com atualizações instantâneas e @menções.",
      },
      {
        icon: BarChart3,
        title: "Análise e Relatórios",
        desc: "Visualize o desempenho operacional com dashboards interativos e relatórios detalhados.",
      },
      {
        icon: Shield,
        title: "Segurança Empresarial",
        desc: "Proteção de dados com criptografia ponta a ponta e conformidade regulatória.",
      },
      {
        icon: Clock,
        title: "Rastreamento Temporal",
        desc: "Registre tempos, estabeleça prazos e otimize o planejamento de recursos.",
      },
      {
        icon: Target,
        title: "Prioridades e Objetivos",
        desc: "Defina prioridades claras e alinhe tarefas com os objetivos estratégicos da equipe.",
      },
    ],
    footerDesc: "Soluções de gestão de tarefas para a indústria petrolífera argentina",
    footerProduct: "Produto",
    footerCompany: "Empresa",
    footerLegal: "Legal",
    footerProductLinks: ["Características", "Preços", "Segurança", "Integrações"],
    footerCompanyLinks: ["Sobre Nós", "Carreiras", "Blog", "Contato"],
    footerLegalLinks: ["Privacidade", "Termos", "Cookies", "Licenças"],
    footerCopyright:
      "© 2025 QALogix — Equipe: QAs · PMs · Devs — Cliente: Empresa petrolífera argentina",
  },
}

export default function HomePage() {
  const [lang, setLang] = useState<"ar" | "br">("ar")
  const t = translations[lang]

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
          <div className="flex gap-2 sm:gap-3 items-center">
            <button
              onClick={() => setLang(lang === "ar" ? "br" : "ar")}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-gray-300 hover:bg-gray-50 transition flex items-center gap-2"
            >
              <span>{lang === "ar" ? "🇦🇷" : "🇧🇷"}</span>
              <span>{lang === "ar" ? "AR" : "BR"}</span>
            </button>
            <Link
              href="/login"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
            >
              {t.login}
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
            >
              {t.register}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32">
        <div className="inline-block mb-6 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
          <span className="text-emerald-700 text-sm font-semibold">{t.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 text-balance max-w-4xl">
          {t.heroTitle}
          <span className="text-emerald-700">QALogix</span>
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.heroDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
          >
            {t.login}
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 rounded-lg border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
          >
            {t.register}
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, i) => {
            const icons = [BarChart3, Clock, Users, Shield]
            const Icon = icons[i]
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-avocado-100">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.featuresTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.featuresDesc}</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((f, i) => (
            <Feature key={i} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
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
              <p className="text-sm text-gray-600 leading-relaxed">{t.footerDesc}</p>
            </div>

            {[t.footerProduct, t.footerCompany, t.footerLegal].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-gray-900 mb-4">{section}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {(i === 0
                    ? t.footerProductLinks
                    : i === 1
                    ? t.footerCompanyLinks
                    : t.footerLegalLinks
                  ).map((link, idx) => (
                    <li key={idx} className="hover:text-emerald-600 cursor-pointer transition-colors">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-avocado-400 text-center text-sm text-gray-600">
            <p>{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function Feature({ icon: Icon, title, desc }: { icon: ElementType; title: string; desc: string }) {
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
  )
}
/*

pov: funciona el codigo

los PM: no es lo que pedimos

el dev: funciona?

los PM: si pero...

el dev:

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢐⣤⣼⣿⣿⣿⣿⣿⣿⣷⣶⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣢⣾⣿⣿⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡟⠛⢻⠉⡉⠍⠁⠁⠀⠈⠙⢻⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠏⢠⢀⡼⡄⠃⠤⠀⠀⠀⠀⠀⡐⠸⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⢰⣸⡎⣀⣷⣤⣶⣶⣶⣦⡀⠀⠈⠓⢿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣇⣤⣯⣿⣿⣿⣿⣿⣿⣿⣭⣯⡆⠀⠀⠘⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⣻⣿⣿⣼⠀⢹⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⢘⣿⠙⠡⢽⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢙⣛⣿⣯⠏⠀⢀⣿⣿⣿⣯⣠⡀⠀⠀⠀⢀⣾⡏⠒⢻⣷⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⡟⢘⣏⣺⣤⣬⣭⣼⣿⣿⣯⡉⢻⣦⣌⣦⣾⣿⣿⡚⠾⠿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢹⡼⣿⣿⢼⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⡿⣿⢿⡟⢳⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⣿⣧⡞⣻⣩⣽⡽⣿⣿⣿⣿⣿⣿⣿⣿⡟⣠⣿⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡿⣇⣬⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⡿⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡛⣿⣄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢼⡃⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠁⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠈⢳⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⢿⡟⠻⢿⣿⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣍⠓⠲⠤⢤⣄⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠈⣿⡏⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠈⠈⢯⡁⠀⠀⠀⠉⠹⠶⢤⣀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣻⠀⢀⠹⣿⡆⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣷⣤⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠚⢩⠀⢸⡄⢹⣿⣦⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣷⣤⡄⠀⢀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠴⠋⡀⣀⣰⣿⠀⠄⠹⣾⣿⣿⡿⣿⠀⢠⣤⣀⣴⣤⣤⡴⠶⠶⠿⠿⠛⠛⠋⠉⠉⣠⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠞⠁⢀⡱⠏⠉⡟⠃⠀⠀⠀⢸⣿⣿⠇⣿⡴⠾⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠟
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡤⠖⢋⣡⣶⣿⣂⡼⠁⠉⠙⠋⠙⠿⠟⣢⣄⢿⡟⠴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠈⠀⠀
⠀⠀⠀⢀⣠⠴⠚⠉⠉⠀⠀⠀⠀⠀⣸⡿⠟⠀⠀⠀⠀⠀⠀⠲⣾⡛⣿⣬⡄⠀⠀⠁⠠⣤⠆⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣠⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠤⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠺⣿⡟⣿⡟⠀⠀⠂⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀
⠞⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢐⡀⡀⣼⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠈⠁⠆⠀⠀⠀


*/