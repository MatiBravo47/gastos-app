import { gastosStorage } from "@/services/gastosStorage";
import { suscripcionesStorage } from "@/services/suscripcionesStorage";
import type { Gasto } from "@/types/Gasto";
import type { Suscripcion } from "@/types/Suscripcion";
import { createContext, useContext, useEffect, useState } from "react";

type GastosContextType = {
  gastos: Gasto[];
  agregarGasto: (gasto: Gasto) => void;
  editarGasto: (gasto: Gasto) => void;
  eliminarGasto: (id: string) => void;

  suscripciones: Suscripcion[];
  agregarSuscripcion: (suscripcion: Suscripcion) => void;
  editarSuscripcion: (suscripcion: Suscripcion) => void;
  eliminarSuscripcion: (id: string) => void;
};

const GastosContext = createContext<GastosContextType | undefined>(undefined);

export function GastosProvider({ children }: { children: React.ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);
  const [datosCargados, setDatosCargados] = useState(false);

  useEffect(() => {
    let activo = true;

    const cargarDatos = async () => {
      const [gastosGuardados, suscripcionesGuardadas] = await Promise.all([
        gastosStorage.getGastos(),
        suscripcionesStorage.getSuscripciones(),
      ]);

      if (!activo) return;

      setGastos(gastosGuardados);
      setSuscripciones(suscripcionesGuardadas);
      setDatosCargados(true);
    };

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!datosCargados) return;
    void gastosStorage.saveGastos(gastos);
  }, [gastos, datosCargados]);

  useEffect(() => {
    if (!datosCargados) return;
    void suscripcionesStorage.saveSuscripciones(suscripciones);
  }, [suscripciones, datosCargados]);

  const agregarGasto = (gasto: Gasto) => {
    setGastos((prev) => [...prev, gasto]);
  };

  const editarGasto = (gasto: Gasto) => {
    setGastos((prev) =>
      prev.map((actual) => (actual.id === gasto.id ? gasto : actual)),
    );
  };

  const eliminarGasto = (id: string) => {
    setGastos((prev) => prev.filter((gasto) => gasto.id !== id));
  };

  const agregarSuscripcion = (suscripcion: Suscripcion) => {
    setSuscripciones((prev) => [...prev, suscripcion]);
  };

  const editarSuscripcion = (suscripcion: Suscripcion) => {
    setSuscripciones((prev) =>
      prev.map((actual) =>
        actual.id === suscripcion.id ? suscripcion : actual,
      ),
    );
  };

  const eliminarSuscripcion = (id: string) => {
    setSuscripciones((prev) =>
      prev.filter((suscripcion) => suscripcion.id !== id),
    );
  };

  return (
    <GastosContext.Provider
      value={{
        gastos,
        agregarGasto,
        editarGasto,
        eliminarGasto,
        suscripciones,
        agregarSuscripcion,
        editarSuscripcion,
        eliminarSuscripcion,
      }}
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
