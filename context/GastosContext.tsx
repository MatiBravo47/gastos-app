import { gastosStorage } from "@/services/gastosStorage";
import { Gasto } from "@/types/Gasto";
import { createContext, useContext, useEffect,useRef, useState } from "react";

type GastosContextType = {
  gastos: Gasto[];
  agregarGasto: (gasto: Gasto) => void;
};

const GastosContext = createContext<GastosContextType | undefined>(undefined);

export function GastosProvider({ children }: { children: React.ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);

// Ref para evitar que se guarde en el primer render (montaje inicial con array vacío)
  const isFirstRender = useRef(true);

  // 📥 Cargar desde storage
  useEffect(() => {
    const load = async () => {
      const data = await gastosStorage.getGastos();
      setGastos(data);
    };
    load();
  }, []);

   // 📤 Guardar cuando cambian, pero NO en el primer render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    gastosStorage.saveGastos(gastos);
  }, [gastos]);

  const agregarGasto = (gasto: Gasto) => {
    setGastos((prev) => [...prev, gasto]);
  };

  return (
    <GastosContext.Provider value={{ gastos, agregarGasto }}>
      {children}
    </GastosContext.Provider>
  );
}

export function useGastosContext() {
  const context = useContext(GastosContext);
  if (!context) {
    throw new Error("useGastosContext debe usarse dentro de GastosProvider");
  }
  return context;
}
