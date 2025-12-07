import { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // TODO: Aquí irá tu lógica de autenticación real (API call)
      // Por ahora, simulamos la autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ejemplo: determinar rol basado en el email
      const role = email.includes("admin") ? "admin" : "cliente";

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
