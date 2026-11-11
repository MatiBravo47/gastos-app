import type { Suscripcion } from "@/types/Suscripcion";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "suscripciones";

export const suscripcionesStorage = {
  async getSuscripciones(): Promise<Suscripcion[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (!data) return [];

      const suscripciones: unknown = JSON.parse(data);
      return Array.isArray(suscripciones)
        ? (suscripciones as Suscripcion[])
        : [];
    } catch (error) {
      console.log("Error al obtener suscripciones:", error);
      return [];
    }
  },

  async saveSuscripciones(suscripciones: Suscripcion[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(suscripciones));
    } catch (error) {
      console.log("Error al guardar suscripciones:", error);
    }
  },
};
