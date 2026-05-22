import { useState } from "react";

export function useMesNavigator() {
  const hoy = new Date();

  const [mes, setMes] = useState(hoy.getMonth());

  const [anio, setAnio] = useState(hoy.getFullYear());

  const irMesAnterior = () => {
    if (mes === 0) {
      setMes(11);
      setAnio((a) => a - 1);
    } else {
      setMes((m) => m - 1);
    }
  };

  const irMesSiguiente = () => {
    const esMesActual = mes === hoy.getMonth() && anio === hoy.getFullYear();

    if (esMesActual) return;

    if (mes === 11) {
      setMes(0);
      setAnio((a) => a + 1);
    } else {
      setMes((m) => m + 1);
    }
  };

  return {
    mes,
    anio,
    irMesAnterior,
    irMesSiguiente,
  };
}
