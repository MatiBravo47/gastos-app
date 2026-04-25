import { useGastosContext } from "../context/GastosContext";
export const useGastosResumen = () => {
  const { gastos } = useGastosContext();

  const total = gastos.reduce((acc, g) => acc + g.monto, 0);

  const gastosAgrupados = gastos.reduce(
    (acc, gasto) => {
      if (!acc[gasto.fecha]) acc[gasto.fecha] = [];
      acc[gasto.fecha].push(gasto);
      return acc;
    },
    {} as Record<string, typeof gastos>,
  );

  return { gastos, total, gastosAgrupados };
};
