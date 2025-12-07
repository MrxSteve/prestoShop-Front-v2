import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.13:8090/api";
;

// ======================================
// STORAGE SERVICE (TOKEN + USER + RECORDAR)
// ======================================
const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";
const REMEMBER_ME_KEY = "remember_me";
const SAVED_CREDENTIALS_KEY = "saved_credentials";

export const StorageService = {
  async saveToken(token) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  },

  async getToken() {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  async removeToken() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },

  async saveUserData(user) {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user:", error);
    }
  },

  async getUserData() {
    try {
      const json = await AsyncStorage.getItem(USER_KEY);
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  async removeUserData() {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  },

  async setRememberMe(value) {
    try {
      await AsyncStorage.setItem(REMEMBER_ME_KEY, value.toString());
    } catch (error) {
      console.error("Error saving remember me:", error);
    }
  },

  async getRememberMe() {
    try {
      const v = await AsyncStorage.getItem(REMEMBER_ME_KEY);
      return v === "true";
    } catch (error) {
      console.error("Error getting remember me:", error);
      return false;
    }
  },

  async saveSavedCredentials(email) {
    try {
      await AsyncStorage.setItem(
        SAVED_CREDENTIALS_KEY,
        JSON.stringify({ email })
      );
    } catch (error) {
      console.error("Error saving credentials:", error);
    }
  },

  async getSavedCredentials() {
    try {
      const json = await AsyncStorage.getItem(SAVED_CREDENTIALS_KEY);
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error("Error getting credentials:", error);
      return null;
    }
  },

  async clearSavedCredentials() {
    try {
      await AsyncStorage.removeItem(SAVED_CREDENTIALS_KEY);
    } catch (error) {
      console.error("Error clearing credentials:", error);
    }
  },

  async clearAuthData() {
    try {
      const remember = await this.getRememberMe();

      if (remember) {
        await Promise.all([
          AsyncStorage.removeItem(TOKEN_KEY),
          AsyncStorage.removeItem(USER_KEY),
        ]);
      } else {
        await Promise.all([
          AsyncStorage.removeItem(TOKEN_KEY),
          AsyncStorage.removeItem(USER_KEY),
          AsyncStorage.removeItem(REMEMBER_ME_KEY),
          AsyncStorage.removeItem(SAVED_CREDENTIALS_KEY),
        ]);
      }
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  },
};

// ======================================
// AXIOS INSTANCE + INTERCEPTORES
// ======================================

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------- REQUEST INTERCEPTOR --------
api.interceptors.request.use(
  async (config) => {
    const token = await StorageService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si se usa FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------- RESPONSE INTERCEPTOR --------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expirado o inválido. Cerrando sesión automáticamente.");
      await StorageService.clearAuthData();
    }

    return Promise.reject(error);
  }
);

// ======================================
//  MÉTODOS DE API (SE PUEDEN EXTENDER)
// ======================================
export const ApiService = {
  // LOGIN
  async login(credentials) {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  },

  // TIENDAS
  async getTiendasDisponibles() {
    const res = await api.get("/auth/tiendas-disponibles");
    return res.data;
  },

  // PERFIL
  async getProfile() {
    const res = await api.get("/auth/profile");
    return res.data;
  },

  // CAMBIAR BASE URL (por si usas un servidor externo)
  setBaseURL(url) {
    api.defaults.baseURL = url;
  },
};
