import { Gasto } from "@/types/Gasto";
import { useState } from "react";

export function useGastos() {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [categoria, setCategoria] = useState("");
  const [gastos, setGastos] = useState<Gasto[]>([]);

  const agregarGasto = () => {
    if (!descripcion || !monto) return;

    const nuevoGasto: Gasto = {
      id: Date.now().toString(),
      descripcion,
      monto: parseFloat(monto),
      fecha: fecha.toLocaleDateString(),
      categoria,
    };

    setGastos((prev) => [...prev, nuevoGasto]);

    // limpiar formulario
    setDescripcion("");
    setMonto("");
    setFecha(new Date());
    setCategoria("");
  };

  const total = gastos.reduce((acc, g) => acc + g.monto, 0);

  const gastosAgrupados = gastos.reduce(
    (acc, gasto) => {
      if (!acc[gasto.fecha]) acc[gasto.fecha] = [];
      acc[gasto.fecha].push(gasto);
      return acc;
    },
    {} as Record<string, Gasto[]>,
  );

  return {
    descripcion,
    setDescripcion,
    monto,
    setMonto,
    fecha,
    setFecha,
    categoria,
    setCategoria,
    agregarGasto,
    total,
    gastosAgrupados,
  };
}
