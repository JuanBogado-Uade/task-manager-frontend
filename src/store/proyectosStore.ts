import { log } from "console";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Proyecto {
  id: number;
  userId: string;
  nombre_proyecto: string;
  descripcion: string;
  fecha_finalizacion?: string | null;
  rol_usuario: string;
}

interface User {
  id: string;
  correo: string;
  nombre: string;
}

interface Store {
  currentUser: User | null;
  proyectos: Proyecto[];
  setCurrentUser: (user: User | null) => void;

  // Auth
  login: (correo: string, contraseña: string) => Promise<void>;
  logout: () => void;

  // Proyectos
  fetchProyectos: () => Promise<void>;
  crearProyecto: (
    nombre_proyecto: string,
    descripcion: string,
    fecha_finalizacion?: string | null
  ) => Promise<void>;
  eliminarProyecto: (proyectoId: number, correo: string) => Promise<void>;

  // Recuperar contraseña (falsa)
  resetPassword: (correo: string, nueva_contraseña: string) => Promise<void>;
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
              descripcion,
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

      // eliminarProyecto: async (proyectoId, correo) => {
      //   try {
      //     console.log('Deleting proyecto with id:', proyectoId, 'for user:', correo);

      //     const res = await fetch(`${API_URL}/proyectos/${proyectoId}`, {
      //       method: "DELETE",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "x-user-mail": correo
      //       },
      //     });
      //     console.log('delete proyecto response:', res);
      //     if (!res.ok) throw new Error("Error al eliminar proyecto");


      //     const proyectosActuales = get().proyectos;
      //     const proyectosActualizados = proyectosActuales.filter((p) => p.id !== id);
      //     set({ proyectos: proyectosActualizados });
      //     console.log('Proyecto with id:', proyectoId, 'deleted successfully');
      //   } catch (error) {
      //     console.error("Error deleting proyecto:", error);
      //   }
      // },
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