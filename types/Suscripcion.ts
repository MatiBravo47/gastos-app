export type PrecioSuscripcion = {
  desdeMes: string; // formato "AAAA-MM", por ejemplo "2026-12"
  monto: number;
};

export type Suscripcion = {
  id: string;
  nombre: string;
  metodoPago: string;
  diaCobro: number; // de 1 a 31
  historialPrecios: PrecioSuscripcion[];
  mesFin?: string; // último mes que se cobra, formato "AAAA-MM"
};
