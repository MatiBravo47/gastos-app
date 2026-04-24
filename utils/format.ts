export const formatearMonto = (monto: number) => {
  return new Intl.NumberFormat("es-AR").format(monto);
};
