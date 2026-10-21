import GastoItem from "@/components/GastoItem";
import MesNavigator from "@/components/MesNavigator";
import TotalGastos from "@/components/totalGastos";
import { Colors } from "@/constants/theme";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { formatearFecha } from "@/utils/format";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CategoryScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const { gastos } = useGastosContext();
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();

  const categoriaData = categorias.find((c) => c.nombre === categoria);

  const gastosFiltrados = gastos
    .filter((g) => {
      const fecha = new Date(g.fecha);
      return (
        g.categoria === categoria &&
        fecha.getMonth() === mes &&
        fecha.getFullYear() === anio
      );
    })
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const total = gastosFiltrados.reduce((acc, g) => acc + g.monto, 0);

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
  back: {
    color: Colors.dark.tint,
    fontSize: 16,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "700",
  },
  total: {
    color: "#e0e0e0",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
  },
  row: {
    marginBottom: 4,
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
