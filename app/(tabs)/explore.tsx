import GastoItem from "@/components/GastoItem";
import HeaderIndex from "@/components/HeaderIndex";
import MesNavigator from "@/components/MesNavigator";
import TotalGastos from "@/components/totalGastos";
import { Colors } from "@/constants/theme";
import { useCategoriasResumen } from "@/hooks/useCategoriasResumen";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { FlatList, Text, View } from "react-native";

export default function TabTwoScreen() {
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();
  const { total } = useGastosResumen(mes, anio);
  const categoriasResumen = useCategoriasResumen(mes, anio);

  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: Colors.dark.background }}
    >
      <HeaderIndex />
      <MesNavigator
        mes={mes}
        anio={anio}
        onAnterior={irMesAnterior}
        onSiguiente={irMesSiguiente}
      />

      <TotalGastos total={total} />
      <Text style={{ color: Colors.dark.text, fontSize: 20 }}>
        Todas las categorias
      </Text>
      <FlatList
        data={categoriasResumen}
        keyExtractor={(item) => item.nombre}
        renderItem={({ item }) => (
          <GastoItem
            titulo={item.nombre}
            monto={item.total}
            icono={item.icono}
            color={item.color}
          />
        )}
      />
    </View>
  );
}
