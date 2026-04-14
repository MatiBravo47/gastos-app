import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Gasto = {
  id: string;
  descripcion: string;
  monto: number;
  fecha: string;
  categoria: string;
};

type Categoria = {
  nombre: string;
  icono: string;
  color: string;
};

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
        gap: 10,
      }}
    >
      <Ionicons
        name={categoriaData?.icono || "help-circle"}
        size={20}
        color="black"
      />

      <Text style={{ flex: 1 }}>
        {gasto.descripcion} - ${gasto.monto}
      </Text>
    </View>
  );
}
