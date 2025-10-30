"use client";

import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  lang: "ar" | "br";
  setLang: (lang: "ar" | "br") => void;
  t: {
    login: string;
    register: string;
  };
}

export default function Header({ lang, setLang, t }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-white/30">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
            <Link href="/">
                    <Image
                    src="/logo.png"
                    alt="QALogix Logo"
                    width={140}
                    height={140}
                    className="rounded-md object-contain w-24 sm:w-36"
                    />
            </Link>
        </div>

        {/* Botones */}
        <div className="flex gap-2 sm:gap-3 items-center">
          {/* Botón de idioma */}
          <button
            onClick={() => setLang(lang === "ar" ? "br" : "ar")}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-gray-300 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <span>{lang === "ar" ? "🇦🇷" : "🇧🇷"}</span>
            <span>{lang === "ar" ? "AR" : "BR"}</span>
          </button>

          {/* Login */}
          <Link
            href="/login"
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
          >
            {t.login}
          </Link>

          {/* Register */}
          <Link
            href="/register"
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
          >
            {t.register}
          </Link>
        </div>
      </div>
    </header>
  );
}
