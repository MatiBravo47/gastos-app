import { StyleSheet, View } from "react-native";

import GastosList from "@/components/FlatList";
import HeaderIndex from "@/components/HeaderIndex";
import TotalGastos from "@/components/totalGastos";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";

export default function HomeScreen() {
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

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <HeaderIndex />

      <TotalGastos total={total} />

      <GastosList gastosAgrupados={gastosAgrupados} categorias={categorias} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
