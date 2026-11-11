import { useGastosContext } from "@/context/GastosContext";
import type { Gasto } from "@/types/Gasto";
import { obtenerCuotaDelMes } from "@/utils/cuotas";

type GastoDelMes = Gasto & {
  cuotaActual: number;
  cantidadCuotas: number;
};

export const useGastosResumen = (mes: number, anio: number) => {
  const { gastos } = useGastosContext();

  const gastosFiltrados: GastoDelMes[] = gastos.flatMap((gasto) => {
    const cuota = obtenerCuotaDelMes(gasto, mes, anio);

    if (!cuota) return [];

    const fechaCompra = new Date(gasto.fecha);
    const ultimoDiaDelMes = new Date(anio, mes + 1, 0).getDate();
    const diaCuota = Math.min(fechaCompra.getDate(), ultimoDiaDelMes);

    const fechaCuota = new Date(
      anio,
      mes,
      diaCuota,
      fechaCompra.getHours(),
      fechaCompra.getMinutes(),
      fechaCompra.getSeconds(),
    );

    return [
      {
        ...gasto,
        monto: cuota.importe,
        fecha: fechaCuota.toISOString(),
        cuotaActual: cuota.numero,
        cantidadCuotas: cuota.cantidad,
      },
    ];
  });

  const total = gastosFiltrados.reduce(
    (acumulado, gasto) => acumulado + gasto.monto,
    0,
  );

  const gastosAgrupados = gastosFiltrados.reduce<Record<string, GastoDelMes[]>>(
    (grupos, gasto) => {
      const fecha = new Date(gasto.fecha);
      const clave = new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
      ).toISOString();

      if (!grupos[clave]) grupos[clave] = [];
      grupos[clave].push(gasto);

      return grupos;
    },
    {},
  );

  return { gastos: gastosFiltrados, total, gastosAgrupados };
};
