import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

type Props = {
  mes: number;
  anio: number;
  onAnterior: () => void;
  onSiguiente: () => void;
};

export default function MesNavigator({
  mes,
  anio,
  onAnterior,
  onSiguiente,
}: Props) {
  const hoy = new Date();

  const esMesActual = mes === hoy.getMonth() && anio === hoy.getFullYear();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onAnterior}
        hitSlop={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        }}
      >
        <Ionicons name="chevron-back" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.mesTexto}>
        {MESES[mes]} {anio}
      </Text>

      <TouchableOpacity
        onPress={onSiguiente}
        disabled={esMesActual}
        hitSlop={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        }}
      >
        <Ionicons
          name="chevron-forward"
          size={22}
          color={esMesActual ? "#666" : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
  },

  mesTexto: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    minWidth: 140,
    textAlign: "center",
  },
});
