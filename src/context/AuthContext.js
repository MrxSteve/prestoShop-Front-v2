import React, { createContext, useContext, useEffect, useState } from "react";
import { StorageService } from "../services/api";
import { loginUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // Restaurar sesión al abrir la app
  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const savedToken = await StorageService.getToken();
      const savedUser = await StorageService.getUserData();

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }
    } catch (e) {
      console.log("Error restoring session:", e);
    }

    setIsLoading(false);
  };


  // LOGIN
  const login = async ({ email, password }) => {
    try {
      setIsLoading(true);



      const data = await loginUser({ email, password });



      // Guardar token
      if (data.token) {
        await StorageService.saveToken(data.token);
        setToken(data.token);
      }

      // Guardar usuario COMPLETO tal como viene
      await StorageService.saveUserData(data);
      setUser(data);

      return data;

    } catch (error) {
      console.log("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  // LOGOUT
  const logout = async () => {
    try {
      setIsLoading(true);
      await StorageService.clearAuthData();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const getUserRole = () => {
    if (!user || !user.roles) return null;

    const roles = user.roles.map(r => r.toUpperCase());

    if (roles.includes("ENCARGADO")) return "ENCARGADO";
    if (roles.includes("EMPLEADO")) return "EMPLEADO";
    if (roles.includes("CLIENTE")) return "CLIENTE";

    return null;
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        userRole: getUserRole(),  // ← IMPORTANTE: enviar el rol directo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

