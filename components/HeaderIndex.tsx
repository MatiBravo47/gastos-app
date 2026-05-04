import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function HeaderIndex({
  mes,
  anio,
  onAnterior,
  onSiguiente,
}: Props) {
  const router = useRouter();

  const hoy = new Date();
  const esMesActual = mes === hoy.getMonth() && anio === hoy.getFullYear();

  return (
    <View style={styles.header}>
      {/* Navegación de mes */}
      <View style={styles.mesNav}>
        <TouchableOpacity
          onPress={onAnterior}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.mesTexto}>
          {MESES[mes]} {anio}
        </Text>

        <TouchableOpacity
          onPress={onSiguiente}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          disabled={esMesActual}
        >
          <Ionicons
            name="chevron-forward"
            size={22}
            color={esMesActual ? "#666" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* Botón agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/modal/new")}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
  },
  mesNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mesTexto: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    minWidth: 140,
    textAlign: "center",
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "300",
  },
});
