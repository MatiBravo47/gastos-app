import type { GastoDelMes } from "@/types/Gasto";
import type { Suscripcion } from "@/types/Suscripcion";

export function obtenerCargoSuscripcionDelMes(
  suscripcion: Suscripcion,
  mes: number,
  anio: number,
): GastoDelMes | null {
  const periodo = `${anio}-${String(mes + 1).padStart(2, "0")}`;

  // mesFin es el último mes en que se cobra, inclusive.
  if (suscripcion.mesFin && periodo > suscripcion.mesFin) {
    return null;
  }

  const precioVigente = suscripcion.historialPrecios
    .filter((precio) => precio.desdeMes <= periodo)
    .sort((a, b) => b.desdeMes.localeCompare(a.desdeMes))[0];

  // Si todavía no había empezado la suscripción en ese mes, no se agrega.
  if (!precioVigente) return null;

  const ultimoDiaDelMes = new Date(anio, mes + 1, 0).getDate();
  const diaCobro = Math.min(suscripcion.diaCobro, ultimoDiaDelMes);

  // Uso el mediodía para evitar que la zona horaria cambie el día al guardar ISO.
  const fechaCargo = new Date(anio, mes, diaCobro, 12);

  return {
    id: `suscripcion-${suscripcion.id}-${periodo}`,
    descripcion: suscripcion.nombre,
    monto: precioVigente.monto,
    fecha: fechaCargo.toISOString(),
    categoria: "Suscripciones",
    metodoPago: suscripcion.metodoPago,
    cuotas: 1,
    cuotaActual: 1,
    cantidadCuotas: 1,
    esSuscripcion: true,
  };
}
