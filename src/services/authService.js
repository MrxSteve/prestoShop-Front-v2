import { api, StorageService } from "./api";

export async function loginUser(credentials) {
  try {
    const res = await api.post("/auth/login", credentials);

    const data = res.data;


    const token = data.token;

    if (token) {
      await StorageService.saveToken(token);
    }

    
    await StorageService.saveUserData(data);

    return data;

  } catch (error) {
    console.log("Login error:", error.response?.data || error.message);

    throw new Error(
      error.response?.data?.message || "Error al iniciar sesión"
    );
  }
}
