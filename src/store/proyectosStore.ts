import { log } from "console";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Proyecto {
  id: number;
  userId: string;
  nombre_proyecto: string;
  descripcion: string;
  fecha_finalizacion?: string | null;
  rol_usuario: string;
  tareas?: Tarea[];
}
interface User {
  id: string;
  correo: string;
  nombre: string;
}
export interface Tarea {
  id: number;
  titulo: string;
  descripcion?: string;
  estado?: string;
  fecha_creacion?: string | "";
  fecha_limite?: string;
}
export interface Lista {
  id: string;
  titulo: string;
  proyectoId: string;
  posicion: number;
  tareas: Tarea[];
}

export interface Store {
  currentUser: User | null;
  proyectos: Proyecto[];
  proyectoActivo?: Proyecto | null;
  setCurrentUser: (user: User | null) => void;

  // Auth
  login: (correo: string, contraseña: string) => Promise<void>;
  logout: () => void;
  resetPassword: (correo: string, nueva_contraseña: string) => Promise<void>;

  // Proyectos
  fetchProyectos: () => Promise<void>;
  crearProyecto: (
    nombre_proyecto: string,
    descripcion: string,
    fecha_finalizacion?: string | null
  ) => Promise<void>;
  eliminarProyecto: (proyectoId: number, correo: string) => Promise<void>;
  
  // ---- Tareas ----
  crearTarea: (proyectoId: string, titulo: string, descripcion: string, fecha_finalizacion: string) => Promise<void>;
  fetchTarea: (id: string) => Promise<void>;
 
}

const API_URL = "https://task-manager-backend-1-ybye.onrender.com";

export const useProyectoStore = create<Store>()(
  persist(
    (set, get) => ({
      currentUser: null,
      proyectos: [],

      // ---- AUTENTICACIÓN ----
      setCurrentUser: (user) => set({ currentUser: user }),

      login: async (correo, contraseña) => {
        try {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contraseña }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error al iniciar sesión");
          }

          const { id, nombre, } = await res.json();
          // console.log("user from login:", usuario, id, nombre);

          set({ currentUser: { id, correo, nombre } });
        } catch (error) {
          console.error("Error en login:", error);
          throw error;
        }
      },

      logout: () => {
        set({ currentUser: null, proyectos: [] });
      },

      // ---- PROYECTOS ----
      fetchTarea: async (id) => {
        const user = get().currentUser;
        if (!user) return;

        const res = await fetch(`${API_URL}/proyectos/${id}/tareas`, {
          headers: { "x-user-mail": user.correo },
        });
        if (!res.ok) throw new Error("Error obteniendo tarea");
        const data = await res.json();
        // Debo consumir esta data para actualizar el estado correctamente
        set((state) => ({
          proyectos: state.proyectos.map((p) =>
            p.id.toString() === id ? { ...p, tareas: data } : p
          ),
        }));
        console.log("Fetched tarea:", data);
      },
      fetchProyectos: async () => {
        const user = get().currentUser;
        if (!user) return;

        try {
          const res = await fetch(`${API_URL}/proyectos`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //Necesito el correo para el backend
              "x-user-mail": user?.correo,
            },
          });
          if (!res.ok) throw new Error("Error al obtener proyectos");
          const data = await res.json();
          console.log("Fetched proyectos:", data);
          set({ proyectos: data });
        } catch (error) {
          console.error("Error fetching proyectos:", error);
        }
      },
      // Obtener un proyecto por ID (con listas y tareas)
      // fetchProyectoPorId: async (id) => {
      //   const res = await fetch(`${API_URL}/proyectos/${id}`);
      //   if (!res.ok) throw new Error("Error obteniendo proyecto");
      //   const data = await res.json();
      //   set({ proyectoActivo: data });
      // },

      crearProyecto: async (nombre_proyecto, descripcion, fecha_finalizacion) => {
        const user = get().currentUser;
        if (!user?.correo) {
          console.error("No se encontró el correo del usuario");
          return;
        }
      

        try {
          const res = await fetch(`${API_URL}/proyectos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-user-mail": user.correo,
            },
            body: JSON.stringify({
              nombre: nombre_proyecto,
              descripcion: descripcion,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Error al crear proyecto:", errorData);
            return;
          }

          const data = await res.json();
          console.log("Proyecto creado:", data);
          return data;

        } catch (error) {
          console.error("Error de red o fetch:", error);
        }
      },
      eliminarProyecto: async (id: number, correo: string) => {
        try {
          const res = await fetch(`${API_URL}/proyectos/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-user-mail": correo,
            },
          });

          if (!res.ok) throw new Error("Error al eliminar el proyecto");

          // ✅ obtener el estado actual correctamente
          const proyectosActuales = get().proyectos;
          const proyectosActualizados = proyectosActuales.filter((p) => p.id !== id);
          set({ proyectos: proyectosActualizados });
        } catch (error) {
          console.error("Error deleting proyecto:", error);
        }
      },

      // ----- LISTAS Y TAREAS -----

      // eliminarLista: async (listaId) => {
      //   const user = get().currentUser;
      //   if (!user) return;
        
      //   const res = await fetch(`${API_URL}/listas/${listaId}`, {
      //     method: "DELETE",
      //     headers: {
      //       "x-user-email": user.correo,
      //     },
      //   });
        
      //   if (!res.ok) {
      //     const error = await res.json();
      //     console.error("Error eliminando lista:", error);
      //     return;
      //   }
        
      //   await get().fetchProyectos();
      // }
      // ,
      // actualizarLista: async (listaId, titulo) => {
      //   const user = get().currentUser;
      //   if (!user) return;
        
      //   const res = await fetch(`${API_URL}/listas/${listaId}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-user-email": user.correo,
      //     },
      //     body: JSON.stringify({ titulo }),
      //   });
        
      //   if (!res.ok) {
      //     const error = await res.json();
      //     console.error("Error actualizando lista:", error);
      //     return;
      //   }
        
      //   await get().fetchProyectos();
      // },
      fetchTareas: async (id: string) => {
        const user = get().currentUser;
        if (!user) return;

        const res = await fetch(`${API_URL}/proyectos/${id}/tareas`, {
          headers: { "x-user-mail": user.correo },
        });

        if (!res.ok) throw new Error("Error obteniendo tareas");
        const tareas = await res.json();


        set((state) => ({
          
          proyectos: state.proyectos.map((p) =>
            p.id.toString() === id ? { ...p, tareas } : p
          ),
        }));
      },
       crearTarea: async (id, titulo, descripcion, fecha_finalizacion) => {
        const user = get().currentUser;
        if (!user) return;

        const res = await fetch(`${API_URL}/proyectos/${id}/tareas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": user.correo,
          },
          body: JSON.stringify({ titulo, descripcion, fecha_finalizacion: '22-22-2' }),
        });

        if (!res.ok) {
          const error = await res.json();
          console.error("Error creando tarea:", error);
          return;
        }

        await get().fetchTarea(id);
      },

      // ---- RECUPERAR CONTRASEÑA (FALSA) ----
      resetPassword: async (correo, nueva_contraseña) => {
        try {
          const res = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, nueva_contraseña }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error al restablecer contraseña");
          }

          const data = await res.json();
          console.log("Contraseña actualizada:", data.message);
        } catch (error) {
          console.error("Error en resetPassword:", error);
          throw error;
        }
      },
    }),
    {
      name: "proyecto-storage", // nombre de la key en localStorage
    }
  )
);