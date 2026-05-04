import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { formatearMonto } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  gasto: Gasto;
  categorias: Categoria[];
  onAcciones: (gasto: Gasto) => void;
};

export default function GastoItem({ gasto, categorias, onAcciones }: Props) {
  const categoriaData = categorias.find((c) => c.nombre === gasto.categoria);

  return (
    <View style={styles.gastoContainer}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: categoriaData?.color || "#eee" },
        ]}
      >
        <Ionicons
          name={(categoriaData?.icono as any) || "help-circle"}
          size={25}
          color="black"
        />
      </View>

      <Text style={styles.descripcion} numberOfLines={1}>
        {gasto.descripcion}
      </Text>

      <Text style={styles.monto}>$ {formatearMonto(gasto.monto)}</Text>

      <TouchableOpacity
        onPress={() => onAcciones(gasto)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.menuBtn}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gastoContainer: {
    marginBottom: 8,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  descripcion: {
    flex: 1,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  monto: {
    fontWeight: "bold",
    marginRight: 8,
  },
  menuBtn: {
    padding: 4,
  },
});
