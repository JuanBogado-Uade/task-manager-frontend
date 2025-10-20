"use client";
import { LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
// import { useBoardStore } from "@/store/boardStore";
import {useProyectoStore} from "@/store/proyectosStore";

export const Navbar = () => {

  const { currentUser, logout } = useProyectoStore();
  const router = useRouter();
console.log(`Navbar - currentUser: ${currentUser}`);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <LayoutDashboard className="h-6 w-6" />
            <span className="font-bold text-lg">Task Manager UADE</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {currentUser && (
            <>
              {currentUser && (
                <span className="text-sm">
                  Hola, <strong>{JSON.stringify(currentUser)}</strong>
                </span>
              )
              }
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
