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
  eliminarProyecto: (proyectoId: number) => Promise<void>;

  // Recuperar contraseña (falsa)
  resetPassword: (correo: string, nueva_contraseña: string) => Promise<void>;
}

const API_URL = "https://task-manager-backend-s4ys.onrender.com";

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

          const {usuario} = await res.json();
          console.log("user from login:", usuario);
          
          set({ currentUser: usuario });
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
          const res = await fetch(`${API_URL}/proyectos?userId=${user.id}`);
          if (!res.ok) throw new Error("Error al obtener proyectos");
          const data = await res.json();
          set({ proyectos: data });
        } catch (error) {
          console.error("Error fetching proyectos:", error);
        }
      },

      crearProyecto: async (nombre_proyecto, descripcion, fecha_finalizacion) => {
        const user = get().currentUser;
        if (!user) return;

        try {
          const res = await fetch(`${API_URL}/proyectos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre_proyecto,
              descripcion,
              fecha_finalizacion,
              userId: user.id,
            }),
          });

          if (!res.ok) throw new Error("Error al crear proyecto");

          const nuevoProyecto = await res.json();
          set((state) => ({ proyectos: [...state.proyectos, nuevoProyecto] }));
        } catch (error) {
          console.error("Error creating proyecto:", error);
        }
      },

      eliminarProyecto: async (proyectoId) => {
        try {
          const res = await fetch(`${API_URL}/proyectos/${proyectoId}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Error al eliminar proyecto");
          set((state) => ({
            proyectos: state.proyectos.filter((p) => p.id !== proyectoId),
          }));
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