import { useGastosContext } from "@/context/GastosContext";
export const useGastosResumen = (mes: number, anio: number) => {
  const { gastos } = useGastosContext();

  const gastosFiltrados = gastos.filter((g) => {
    const fecha = new Date(g.fecha);
    return fecha.getMonth() === mes && fecha.getFullYear() === anio;
  });

  const total = gastosFiltrados.reduce((acc, g) => acc + g.monto, 0);

  const gastosAgrupados = gastosFiltrados.reduce(
    (acc, gasto) => {
      // Agrupar por fecha (solo día, sin hora) para que queden juntos
      const fecha = new Date(gasto.fecha);
      const key = new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
      ).toISOString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(gasto);
      return acc;
    },
    {} as Record<string, typeof gastosFiltrados>,
  );

  return { gastos: gastosFiltrados, total, gastosAgrupados };
};
