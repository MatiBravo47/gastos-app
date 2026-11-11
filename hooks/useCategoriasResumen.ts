import { categorias } from "@/data/categorias";
import { useGastosResumen } from "@/hooks/useGastosResumen";

export const useCategoriasResumen = (mes: number, anio: number) => {
  const { gastos } = useGastosResumen(mes, anio);

  return categorias.map((categoria) => {
    const total = gastos
      .filter((gasto) => gasto.categoria === categoria.nombre)
      .reduce((acumulado, gasto) => acumulado + gasto.monto, 0);

    return {
      ...categoria,
      total,
    };
  });
};
