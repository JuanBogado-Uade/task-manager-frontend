import React, { useMemo } from "react";
import { Card } from "@/app/components/ui/card";
import { Clock, Loader2, CheckCircle, UserX } from "lucide-react";
import { Proyecto } from "@/store/proyectosStore";


const ESTADO_CONFIG: Record<
  string,
  { clase: string; icon: React.ElementType }
> = {
  "sin asignar": { clase: "bg-slate-200 text-slate-700", icon: UserX },
  pendiente: { clase: "bg-amber-100 text-amber-800", icon: Clock },
  "en progreso": { clase: "bg-sky-100 text-sky-800", icon: Loader2 },
  completado: { clase: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
};

const ListaTareas = ({ proyecto }: {proyecto: Proyecto}) => {
  const tareas = proyecto.tareas || [];

  const tareasRenderizadas = useMemo(() => {
    if (tareas.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-12 w-full">
          <p className="text-gray-500 text-sm mb-3">
            No hay tareas en este proyecto.
          </p>
        </div>
      );
    }

    return tareas.map(
      ({ id, titulo, descripcion, fecha_creacion, fecha_limite, estado }) => {
        // 🟢 Determinar el estado actual
        const estadoActual = estado || "sin asignar";
        const { clase, icon: Icon } =
          ESTADO_CONFIG[estadoActual] || ESTADO_CONFIG["sin asignar"];

        return (
          <Card
            key={id}
            className="min-w-[320px] bg-avocado-300 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="p-4 flex flex-col h-full">
              {/* 🏷️ Título */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {titulo}
              </h3>

              {/* 📝 Descripción */}
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                {descripcion || "Sin descripción"}
              </p>

              {/* 📅 Fechas */}
              <div className="text-xs text-gray-400 mb-4">
                Creada el: {fecha_creacion || "Desconocida"}
              </div>
              <div className="text-xs text-gray-400 mb-4">
                Fecha límite: {fecha_limite || "No establecida"}
              </div>

              {/* 🟡 Estado */}
              <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg font-medium ${clase}`}
                >
                  <Icon className="w-3 h-3" />
                  {estadoActual}
                </span>
              </div>
            </div>
          </Card>
        );
      }
    );
  }, [tareas]);

  return (
    <div className="flex-1 p-6 bg-avocado-50 rounded-xl shadow-inner overflow-x-auto">
      <div className="flex gap-6 min-w-max pb-4">{tareasRenderizadas}</div>
    </div>
  );
};

export default React.memo(ListaTareas);