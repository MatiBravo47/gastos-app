export const formatearMonto = (monto: number) => {
  return new Intl.NumberFormat("es-AR").format(monto);
};

export const formatearFecha = (fechaISO: string) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-AR");
};
