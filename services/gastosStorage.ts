import { Gasto } from "@/types/Gasto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "gastos";

// Detecta si una fecha es el formato viejo (ej: "25/4/2026")
// y la convierte a ISO (ej: "2026-04-25T00:00:00.000Z")
const migrarFecha = (fecha: string): string => {
  if (fecha.includes("T") || fecha.includes("-")) {
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

      // Si no hay datos guardados
      if (!data) return [];

      let gastos: Gasto[];

      // Intentar parsear el JSON
      try {
        gastos = JSON.parse(data);
      } catch (parseError) {
        console.log("JSON corrupto en AsyncStorage:", parseError);

        // Limpiar datos corruptos
        await AsyncStorage.removeItem(STORAGE_KEY);

        return [];
      }

      // Migrar fechas viejas al nuevo formato ISO
      const gastosMigrados = gastos.map((g) => ({
        ...g,
        fecha: migrarFecha(g.fecha),
      }));

      // Detectar si hubo cambios
      const huboCambios = gastosMigrados.some(
        (g, i) => g.fecha !== gastos[i].fecha,
      );

      // Guardar nuevamente si hubo migración
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
