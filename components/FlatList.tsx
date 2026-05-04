import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { formatearFecha, formatearMonto } from "@/utils/format";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GastoItem from "./GastoItem";

type Props = {
  gastosAgrupados: Record<string, Gasto[]>;
  categorias: Categoria[];
  onAccionesGasto: (gasto: Gasto) => void;
};

export default function GastosList({
  gastosAgrupados,
  categorias,
  onAccionesGasto,
}: Props) {
  const fechas = Object.keys(gastosAgrupados).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  if (fechas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay gastos este mes</Text>
      </View>
    );
  }

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
            <View style={styles.headerContainer}>
              <Text style={styles.headerDateTotal}>
                {formatearFecha(fecha)}
              </Text>
              <Text style={styles.headerDateTotal}>
                ${formatearMonto(totalPorFecha)}
              </Text>
            </View>

            {gastosAgrupados[fecha].map((gasto) => (
              <GastoItem
                key={gasto.id}
                gasto={gasto}
                categorias={categorias}
                onAcciones={onAccionesGasto}
              />
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
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
});
