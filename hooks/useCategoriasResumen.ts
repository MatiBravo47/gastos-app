import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";

export const useCategoriasResumen = (mes: number, anio: number) => {
  const { gastos } = useGastosContext();

  const gastosFiltrados = gastos.filter((gasto) => {
    const fecha = new Date(gasto.fecha);

    return fecha.getMonth() === mes && fecha.getFullYear() === anio;
  });

  const resumenCategorias = categorias.map((categoria) => {
    const total = gastosFiltrados
      .filter((g) => g.categoria === categoria.nombre)
      .reduce((acc, gasto) => acc + gasto.monto, 0);

    return {
      ...categoria,
      total,
    };
  });

  return resumenCategorias;
};
