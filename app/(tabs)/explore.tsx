import GastoItem from "@/components/GastoItem";
import { categorias } from "@/data/categorias";
import { FlatList, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Text style={{ color: "#ffffff" }}>Todas las categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.nombre}
        renderItem={({ item }) => (
          <GastoItem
            titulo={item.nombre}
            monto={15000}
            icono={item.icono}
            color={item.color}
          />
        )}
      />
    </View>
  );
}
