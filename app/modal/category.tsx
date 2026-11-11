import GastoItem from "@/components/GastoItem";
import MesNavigator from "@/components/MesNavigator";
import TotalGastos from "@/components/totalGastos";
import { Colors } from "@/constants/theme";
import { categorias } from "@/data/categorias";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { formatearFecha } from "@/utils/format";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CategoryScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();
  const { gastos: gastosDelMes } = useGastosResumen(mes, anio);

  const categoriaData = categorias.find((c) => c.nombre === categoria);

  const gastosFiltrados = gastosDelMes
    .filter((gasto) => gasto.categoria === categoria)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const total = gastosFiltrados.reduce(
    (acumulado, gasto) => acumulado + gasto.monto,
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{categoria}</Text>
      </View>

      <MesNavigator
        mes={mes}
        anio={anio}
        onAnterior={irMesAnterior}
        onSiguiente={irMesSiguiente}
      />

      <TotalGastos total={total} />

      {gastosFiltrados.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No hay gastos en esta categoría este mes
          </Text>
        </View>
      ) : (
        <FlatList
          data={gastosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <GastoItem
                titulo={item.descripcion}
                monto={item.monto}
                icono={categoriaData?.icono ?? "apps"}
                color={categoriaData?.color ?? "#999"}
              />

              {item.cantidadCuotas > 1 && (
                <Text style={styles.cuota}>
                  Cuota {item.cuotaActual} de {item.cantidadCuotas}
                </Text>
              )}

              <Text style={styles.fecha}>{formatearFecha(item.fecha)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  header: {
    marginTop: 14,
    marginBottom: 10,
    gap: 8,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "700",
  },
  row: {
    marginBottom: 4,
  },
  cuota: {
    color: "#e0e0e0",
    fontSize: 12,
    marginLeft: 16,
  },
  fecha: {
    color: "#9ca3af",
    fontSize: 12,
    marginLeft: 16,
    marginBottom: 8,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#9ca3af",
    fontSize: 16,
  },
});
