import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  gasto: Gasto;
  categorias: Categoria[];
};

export default function GastoItem({ gasto, categorias }: Props) {
  const categoriaData = categorias.find((c) => c.nombre === gasto.categoria);
  return (
    <View
      style={[
        styles.gastoContainer,
        {
          backgroundColor: categoriaData?.color || "#eee",
        },
      ]}
    >
      <View>
        <Ionicons
          name={categoriaData?.icono || "help-circle"}
          size={25}
          color="black"
        />
      </View>
      <Text>{gasto.descripcion}</Text>
      <Text>${gasto.monto}</Text>
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
});
