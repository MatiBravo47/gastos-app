import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GastoItem from "./GastoItem";

export const formatearMonto = (monto: number) => {
  return new Intl.NumberFormat("es-AR").format(monto);
};

type Props = {
  gastosAgrupados: Record<string, Gasto[]>;
  categorias: Categoria[];
};

export default function GastosList({ gastosAgrupados, categorias }: Props) {
  const fechas = Object.keys(gastosAgrupados);

  return (
    <FlatList
      data={fechas}
      keyExtractor={(item) => item}
      renderItem={({ item: fecha }) => {
        const totalPorFecha = gastosAgrupados[fecha].reduce(
          (acc, g) => acc + g.monto,
          0,
        );

        return (
          <View style={{ marginBottom: 15 }}>
            {/* Header de fecha + total */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerDateTotal}>{fecha}</Text>

              <Text style={styles.headerDateTotal}>
                ${formatearMonto(totalPorFecha)}
              </Text>
            </View>

            {/* Lista de gastos */}
            {gastosAgrupados[fecha].map((gasto) => (
              <GastoItem key={gasto.id} gasto={gasto} categorias={categorias} />
            ))}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerDateTotal: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
});
