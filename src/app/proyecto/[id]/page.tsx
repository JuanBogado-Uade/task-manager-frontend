"use client";
import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProyectoStore } from "@/store/proyectosStore";
import { Navbar } from "@/app/components/Navbar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Plus, ArrowLeft, MoreVertical } from "lucide-react";
import { Clock, Loader2, CheckCircle, UserX } from "lucide-react";
import AgregarIntegrante from "@/app/components/AgregarIntegrante";
import ListaTareas from "@/app/components/ListaTareas";
import { log } from "console";



export default function ProyectoVista() {
  // -----------------------------
  // 🔧 Estados y hooks principales
  // -----------------------------
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const params = useParams();
  const router = useRouter();
  const proyectoId = params?.id as string | undefined;

  // Acceso al store de proyectos
  const { proyectos, crearTarea, currentUser, fetchTarea } = useProyectoStore();
  console.log("Proyecto ID from params:", proyectoId);
  console.log("Current User:", currentUser);
  console.log("Proyectos in store:", proyectos);
  console.log("Tareas in current proyecto:", proyectos.find((p) => p.id.toString() === proyectoId)?.tareas);

  // Buscar el proyecto actual por ID
  const proyecto = proyectos.find((p) => p.id.toString() === proyectoId);
  console.log("Current Proyecto:", proyecto?.tareas);



  // -----------------------------
  // ⚙️ Funciones de manejo lógico
  // -----------------------------
  useEffect(() => {
    if (proyectoId && !proyecto?.tareas?.length) {
      fetchTarea(proyectoId);
    }
  }, [proyectoId]);

  const toggleMenu = () => setMenuAbierto((prev) => !prev);
  const abrirAgregarIntegrante = () => {
    setMenuAbierto(false);
    setMostrarModal(true);
  };
  const cerrarModal = () => setMostrarModal(false);

  const handleCreateList = async () => {
    console.log(newListTitle.trim(), proyectoId);

    if (newListTitle.trim() && proyectoId) {
      try {
        await crearTarea(proyectoId, newListTitle, "Descripción de ejemplo", "2024-12-31");
        setNewListTitle("");
        setIsCreatingList(false);
      } catch (error) {
        console.error("Error creando lista:", error);
      }
    }
  };

  // -----------------------------
  // 🚫 Estado: Proyecto no encontrado
  // -----------------------------
  if (!proyecto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-xl font-bold mb-2">Proyecto no encontrado</h2>
          <p className="text-sm text-muted-foreground mb-4">
            El proyecto con ID {proyectoId} no existe o no está disponible.
          </p>
          <Button onClick={() => router.push("/dashboard")}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // 🧩 Render principal
  // -----------------------------
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 🔝 Barra de navegación */}
      <Navbar />

      {/* 🔙 Botón para volver al dashboard */}
      <div className="p-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          aria-label="Volver al dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">
          Tablero: {proyecto.nombre_proyecto}
        </h1>

        {/* Menú de tres puntos */}
        <div className="ml-auto relative">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Menú desplegable */}
          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <button
                onClick={abrirAgregarIntegrante}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Agregar integrantes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🧍‍♂️ Modal para agregar integrantes */}
      {mostrarModal && currentUser && (
        <AgregarIntegrante
          proyectoId={Number(proyectoId)}
          user={currentUser}
          onClose={cerrarModal}
        />
      )}

      {/* 📋 Sección para crear nuevas listas */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t">
        <h2 className="text-xl font-semibold">Tareas del Proyecto</h2>

        {isCreatingList ? (
          <Card className="p-4 flex flex-col sm:flex-row gap-2 items-center max-w-sm sm:max-w-md">
            <Input
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Título de la nueva lista"
              className="flex-1"
            />
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button onClick={handleCreateList}>Guardar</Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsCreatingList(false);
                  setNewListTitle("");
                }}
              >
                Cancelar
              </Button>
            </div>
          </Card>
        ) : (
          <Button
            variant="outline"
            className="flex items-center gap-2 {isCreatingList ? 'hidden' : ''}"
            onClick={() => setIsCreatingList(true)}
          >
            <Plus className="w-4 h-4" /> Agregar Tarea
          </Button>
        )}
      </div>
      {/* 🗂️ Lista de tareas */}
      <ListaTareas proyecto={proyecto} />
    </div >
  ) ;
}