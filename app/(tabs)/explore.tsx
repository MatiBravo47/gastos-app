import GastoItem from "@/components/GastoItem";
import HeaderIndex from "@/components/HeaderIndex";
import MesNavigator from "@/components/MesNavigator";
import TotalGastos from "@/components/totalGastos";
import { categorias } from "@/data/categorias";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { FlatList, Text, View } from "react-native";

export default function TabTwoScreen() {
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();
  const { total } = useGastosResumen(mes, anio);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#000" }}>
      <HeaderIndex />
      <MesNavigator
        mes={mes}
        anio={anio}
        onAnterior={irMesAnterior}
        onSiguiente={irMesSiguiente}
      />

      <TotalGastos total={total} />
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
