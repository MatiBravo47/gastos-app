import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  gasto: Gasto;
  categorias: Categoria[];
};

export default function GastoItem({ gasto, categorias }: Props) {
  const categoriaData = categorias.find((c) => c.nombre === gasto.categoria);
  return (
    <View
      style={{
        marginBottom: 8,
        padding: 15,
        backgroundColor: categoriaData?.color || "#eee",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
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
    </View>
  );
}
