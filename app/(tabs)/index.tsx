import { StyleSheet, View } from "react-native";

import GastosList from "@/components/FlatList";
import HeaderIndex from "@/components/HeaderIndex";
import TotalGastos from "@/components/totalGastos";
import { categorias } from "@/data/categorias";
import { useGastosResumen } from "@/hooks/useGastosResumen";

export default function HomeScreen() {
  const { total, gastosAgrupados } = useGastosResumen();

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
