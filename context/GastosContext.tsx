import { Gasto } from "@/types/Gasto";
import { createContext, useContext, useState } from "react";

type GastosContextType = {
  gastos: Gasto[];
  agregarGasto: (gasto: Gasto) => void;
};

const GastosContext = createContext<GastosContextType | undefined>(undefined);

export function GastosProvider({ children }: { children: React.ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);

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
