import React, { createContext, ReactNode, useContext, useState } from "react";

type UserRole = "cliente" | "admin" | null;

interface User {
  id: string;
  nombre: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Aquí irá tu lógica de autenticación real (API call)
      // Por ahora, simulamos la autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ejemplo: determinar rol basado en el email
      const role: UserRole = email.includes("admin") ? "admin" : "cliente";

      setUser({
        id: "1",
        nombre: email.split("@")[0],
        role,
      });
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
