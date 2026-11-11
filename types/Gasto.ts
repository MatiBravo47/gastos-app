export type Gasto = {
  id: string;
  descripcion: string;
  monto: number;
  fecha: string;
  categoria: string;
  metodoPago: string;
  cuotas?: number;
};

export type GastoDelMes = Gasto & {
  cuotaActual: number;
  cantidadCuotas: number;
  esSuscripcion?: boolean;
};
