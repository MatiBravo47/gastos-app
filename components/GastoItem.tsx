import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const formatearMonto = (monto: number) => {
  return new Intl.NumberFormat("es-AR").format(monto);
};

type Props = {
  gasto: Gasto;
  categorias: Categoria[];
};

export default function GastoItem({ gasto, categorias }: Props) {
  const categoriaData = categorias.find((c) => c.nombre === gasto.categoria);
  return (
    <View style={[styles.gastoContainer]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: categoriaData?.color || "#eee" },
        ]}
      >
        <Ionicons
          name={categoriaData?.icono || "help-circle"}
          size={25}
          color="black"
        />
      </View>
      <Text style={{ fontWeight: "bold" }}>{gasto.descripcion}</Text>
      <Text style={{ fontWeight: "bold" }}>
        $ {formatearMonto(gasto.monto)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gastoContainer: {
    flex: 1,
    marginBottom: 8,
    padding: 15,
    justifyContent: "space-between",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, // la mitad del width/height → círculo perfecto
    alignItems: "center",
    justifyContent: "center",
  },
});
