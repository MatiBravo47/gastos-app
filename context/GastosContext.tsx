import { gastosStorage } from "@/services/gastosStorage";
import { Gasto } from "@/types/Gasto";
import { createContext, useContext, useEffect, useRef, useState } from "react";

{
  /*Este archivo sirve para:

    -compartir gastos entre pantallas
    -evitar pasar props manualmente
    -centralizar lógica
*/
}

type GastosContextType = {
  gastos: Gasto[];
  agregarGasto: (gasto: Gasto) => void;
  editarGasto: (gasto: Gasto) => void;
  eliminarGasto: (id: string) => void;
};

const GastosContext = createContext<GastosContextType | undefined>(undefined);

export function GastosProvider({ children }: { children: React.ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const isFirstRender = useRef(true);

  {
    /* Cargar gastos */
    /* Se ejecuta UNA sola vez cuando abre la app */
  }
  useEffect(() => {
    const load = async () => {
      const data = await gastosStorage.getGastos();
      setGastos(data);
    };
    load();
  }, []);

  {
    /* Cada vez que cambian los gastos: guardar automáticamente */
  }
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

  {
    /*Recorre todos los gastos.

Si encuentra mismo id:

reemplaza

Si no:

deja igual */
  }
  const editarGasto = (gasto: Gasto) => {
    setGastos((prev) => prev.map((g) => (g.id === gasto.id ? gasto : g)));
  };

  {
    /*Filtra todos menos el id eliminado. */
  }
  const eliminarGasto = (id: string) => {
    setGastos((prev) => prev.filter((g) => g.id !== id));
  };

  {
    /* Acá se comparte todo globalmente. */
  }
  return (
    <GastosContext.Provider
      value={{ gastos, agregarGasto, editarGasto, eliminarGasto }}
    >
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
