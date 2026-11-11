import GastoItem from "@/components/GastoItem";
import MesNavigator from "@/components/MesNavigator";
import TotalGastos from "@/components/totalGastos";
import { Colors } from "@/constants/theme";
import { metodosPago } from "@/data/metodosPago";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { formatearFecha } from "@/utils/format";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function MetodoPagoDetail() {
  const { metodoPago } = useLocalSearchParams<{ metodoPago: string }>();
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();
  const { gastos: gastosDelMes } = useGastosResumen(mes, anio);

  const metodo = metodosPago.find((item) => item.nombre === metodoPago);

  const gastosFiltrados = gastosDelMes
    .filter((gasto) => gasto.metodoPago === metodoPago)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const total = gastosFiltrados.reduce(
    (acumulado, gasto) => acumulado + gasto.monto,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metodoPago}</Text>

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
            No hay gastos con este medio de pago este mes
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
                icono={metodo?.icono ?? "card-outline"}
                color={metodo?.color ?? "#999"}
                logo={metodo?.logo}
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
  title: {
    marginTop: 14,
    marginBottom: 10,
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
    textAlign: "center",
  },
});
