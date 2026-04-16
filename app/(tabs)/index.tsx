import { router } from "expo-router";
import { Button, Text, View } from "react-native";

import GastosList from "@/components/FlatList";
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
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      {/* BOTÓN PARA ABRIR MODAL */}
      <Button title="+" onPress={() => router.push("/modal/new")} />

      {/* TOTAL */}
      <Text style={{ textAlign: "center", fontSize: 40, marginTop: 20 }}>
        ${total}
      </Text>

      <Text style={{ textAlign: "center", fontSize: 17, marginBottom: 10 }}>
        Gasto mensual
      </Text>

      {/* LISTA */}
      <GastosList gastosAgrupados={gastosAgrupados} categorias={categorias} />
    </View>
  );
}
