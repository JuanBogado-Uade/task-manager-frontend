"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProyectoStore } from "@/store/proyectosStore";
import { Navbar } from "@/app/components/Navbar";
import { Plus } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export default function Dashboard() {
  const router = useRouter();

  const {
    proyectos,
    crearProyecto,
    fetchProyectos,
    eliminarProyecto,
    currentUser,
  } = useProyectoStore();

  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  // Memorizar proyectos del usuario actual para evitar recomputar 
  const userProyectos = useMemo(() => {
    if (!currentUser) return [];
    return proyectos;
  }, [proyectos, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    fetchProyectos().catch((err) =>
      console.error("Error cargando proyectos:", err)
    );
  }, [currentUser, fetchProyectos]);

  console.log(proyectos);

  // Función para crear proyectos 
  const handleCreateBoard = useCallback(async () => {
    const nombre = newBoardTitle.trim();
    const descripcion = description.trim();
    if (!nombre || !currentUser || !descripcion ) return;

    setCreating(true);
    try {
      await crearProyecto(nombre, descripcion, null);
      setNewBoardTitle("");
      setDescription("");
      setIsCreating(false);
      await fetchProyectos();
    } catch (error) {
      console.error("Error creando proyecto:", error);
    } finally {
      setCreating(false);
    }
  }, [newBoardTitle, currentUser, crearProyecto, description]);

  // Manejo de teclado 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreateBoard();
    if (e.key === "Escape") {
      setIsCreating(false);
      setNewBoardTitle("");
    }
  };

  // Eliminar proyecto
  const handleDelete = useCallback(
    async (id: number) => {
      if (!currentUser) {
        console.error("Usuario no autenticado");
        return;
      }
      if (!confirm("¿Eliminar este proyecto?")) return;
      try {
        console.log( "El correo  ",currentUser.correo);
        
        await eliminarProyecto(id, currentUser.correo);
      } catch (err) {
        console.error("Error eliminando proyecto:", err);
      }
      await fetchProyectos();
    },
    [eliminarProyecto, currentUser]
  );

  return (
    <div className="min-h-screen bg-avocado-200 text-emerald-950">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-3 text-emerald-900 drop-shadow-sm">
            Tus tableros
          </h1>
          <p className="text-emerald-800/70 text-lg">
            Organiza tus proyectos y tareas de manera eficiente
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* SI ESTA VACIO MUESTRA ESTO */}
          {userProyectos.length === 0 && (
            <Card className="p-8 border border-emerald-300/40 bg-emerald-50/70 rounded-2xl shadow-sm">
              <p className="text-emerald-800/70 text-sm">
                No tienes tableros todavía. Crea uno nuevo para comenzar.
              </p>
            </Card>
          )}

          {/* LISTADO DE PROYECTOS */}
          {userProyectos.map((proyecto) => (
            <Card
              key={proyecto.id}
              className="p-5 border border-emerald-300/40 bg-white/80 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/proyecto/${proyecto.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push(`/proyecto/${proyecto.id}`);
                  }
                }}
                className="cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-emerald-900">
                  {proyecto.nombre_proyecto}
                </h3>
                <p className="text-sm text-emerald-700/80 mt-2 line-clamp-2">
                  {proyecto.descripcion}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(proyecto.id)}
                  className="text-emerald-700 hover:bg-emerald-100 rounded-md"
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}

          {/* CREAR TABLERO */}
          {isCreating ? (
            <Card className="h-auto p-5 flex flex-col gap-3 border border-emerald-300/50 bg-emerald-50/70 rounded-2xl shadow-md">
              <Input
                className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 rounded-lg"
                placeholder="Título del tablero..."
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                aria-label="Título del proyecto"
              />
              <Input
                className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 rounded-lg"
                placeholder="Descripcion del tablero..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                aria-label="Descripcion del proyecto"
              />
              <div className="flex gap-3 justify-end">
                <Button
                  size="sm"
                  onClick={handleCreateBoard}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all"
                  disabled={creating}
                >
                  {creating ? "Creando..." : "Crear"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsCreating(false);
                    setNewBoardTitle("");
                  }}
                  className="text-emerald-700 hover:bg-emerald-200/60 rounded-md transition-colors"
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          ) : (
            <Card
              role="button"
              tabIndex={0}
              className="h-auto cursor-pointer border border-emerald-300/40 bg-emerald-50/70 hover:bg-emerald-100/80 transition-all hover:shadow-lg hover:scale-105 rounded-2xl flex items-center justify-center"
              onClick={() => setIsCreating(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsCreating(true);
                }
              }}
              aria-label="Crear nuevo tablero"
            >
              <div className=" flex flex-col items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors">
                <Plus className="h-9 w-9" />
                <span className="font-semibold text-base">
                  Crear nuevo tablero
                </span>
              </div>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}