export const formatearMonto = (monto: number) => {
  return new Intl.NumberFormat("es-AR").format(monto);
};

//Para mostrar datos en formato legible, ej: "25/4/2026" en vez de "2026-04-25T00:00:00.000Z"
export const formatearFecha = (fechaISO: string) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-AR");
};
