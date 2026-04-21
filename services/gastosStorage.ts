import { Gasto } from "@/types/Gasto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "gastos";

export const gastosStorage = {
  async getGastos(): Promise<Gasto[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
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
