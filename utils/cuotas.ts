import type { Gasto } from "@/types/Gasto";

export function obtenerCuotaDelMes(
  gasto: Gasto,
  mes: number, // 0 = enero, como Date.getMonth()
  anio: number,
) {
  const fechaCompra = new Date(gasto.fecha);
  const cantidadCuotas = gasto.cuotas ?? 1;

  const diferenciaMeses =
    (anio - fechaCompra.getFullYear()) * 12 + mes - fechaCompra.getMonth();

  if (diferenciaMeses < 0 || diferenciaMeses >= cantidadCuotas) {
    return null;
  }

  const importeBase = Math.floor((gasto.monto / cantidadCuotas) * 100) / 100;

  const importe =
    diferenciaMeses === cantidadCuotas - 1
      ? Number((gasto.monto - importeBase * (cantidadCuotas - 1)).toFixed(2))
      : importeBase;

  return {
    numero: diferenciaMeses + 1,
    cantidad: cantidadCuotas,
    importe,
  };
}
