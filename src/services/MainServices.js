import { api } from "./api";

export function getTiendasDisponibles() {
  return api.get("/auth/tiendas-disponibles").then((res) => res.data);
}
