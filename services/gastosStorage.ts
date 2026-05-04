import { Gasto } from "@/types/Gasto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "gastos";

// Detecta si una fecha es el formato viejo (ej: "25/4/2026")
// y la convierte a ISO
const migrarFecha = (fecha: string): string => {
  if (fecha.includes("T") || fecha.includes("-")) {
    // Ya es ISO, no tocar
    return fecha;
  }
  // Es formato localizado "dd/mm/yyyy" → convertir
  const [dia, mes, anio] = fecha.split("/").map(Number);
  return new Date(anio, mes - 1, dia).toISOString();
};

export const gastosStorage = {
  async getGastos(): Promise<Gasto[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const gastos: Gasto[] = JSON.parse(data);

      // Migrar fechas viejas al nuevo formato ISO
      const gastosMigrados = gastos.map((g) => ({
        ...g,
        fecha: migrarFecha(g.fecha),
      }));

      // Si hubo alguna migración, guardar inmediatamente
      const huboCambios = gastosMigrados.some(
        (g, i) => g.fecha !== gastos[i].fecha,
      );
      if (huboCambios) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gastosMigrados));
      }

      return gastosMigrados;
    } catch (error) {
      console.log("Error al obtener gastos:", error);
      return [];
    }
  },

  async saveGastos(gastos: Gasto[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));
    } catch (error) {
      console.log("Error al guardar gastos:", error);
    }
  },
};
