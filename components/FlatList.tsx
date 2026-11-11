import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { formatearFecha, formatearMonto } from "@/utils/format";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GastoItem from "./GastoItem";

type Props = {
  gastosAgrupados: Record<string, GastoDelMes[]>;
  categorias: Categoria[];
  onAccionesGasto: (gasto: Gasto) => void;
};

type GastoDelMes = Gasto & {
  cuotaActual?: number;
  cantidadCuotas?: number;
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
          <View style={{ marginBottom: 20 }}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerDateTotal}>
                {formatearFecha(fecha)}
              </Text>

              <Text style={styles.headerDateTotal}>
                ${formatearMonto(totalPorFecha)}
              </Text>
            </View>

            {gastosAgrupados[fecha].map((gasto) => {
              const categoriaData = categorias.find(
                (c) => c.nombre === gasto.categoria,
              );

              return (
                <View key={gasto.id}>
                  <GastoItem
                    titulo={gasto.descripcion}
                    monto={gasto.monto}
                    icono={categoriaData?.icono || "help-circle"}
                    color={categoriaData?.color || "#999"}
                    onPress={() => onAccionesGasto(gasto)}
                  />

                  {gasto.cantidadCuotas && gasto.cantidadCuotas > 1 && (
                    <Text style={styles.cuota}>
                      Cuota {gasto.cuotaActual} de {gasto.cantidadCuotas}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 4,
  },

  headerDateTotal: {
    color: "#e0e0e0",
    fontWeight: "bold",
    fontSize: 18,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  emptyText: {
    color: "#9ca3af",
    fontSize: 16,
  },
  cuota: {
    color: "#9ca3af",
    fontSize: 12,
    marginLeft: 16,
    marginTop: -6,
    marginBottom: 8,
  },
});
