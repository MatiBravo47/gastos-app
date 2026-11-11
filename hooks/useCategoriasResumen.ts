import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { obtenerCuotaDelMes } from "@/utils/cuotas";

export const useCategoriasResumen = (mes: number, anio: number) => {
  const { gastos } = useGastosContext();

  const gastosDelMes = gastos.flatMap((gasto) => {
    const cuota = obtenerCuotaDelMes(gasto, mes, anio);

    if (!cuota) return [];

    return [
      {
        ...gasto,
        monto: cuota.importe,
      },
    ];
  });

  const resumenCategorias = categorias.map((categoria) => {
    const total = gastosDelMes
      .filter((gasto) => gasto.categoria === categoria.nombre)
      .reduce((acumulado, gasto) => acumulado + gasto.monto, 0);

    return {
      ...categoria,
      total,
    };
  });

  return resumenCategorias;
};
