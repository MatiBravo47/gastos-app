import GastoItem from "@/components/GastoItem";
import HeaderIndex from "@/components/HeaderIndex";
import MesNavigator from "@/components/MesNavigator";
import TotalGastos from "@/components/totalGastos";
import { Colors } from "@/constants/theme";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();
  const { total } = useGastosResumen(mes, anio);
  const tarjetasFicticias = [
    { nombre: "Provincia", monto: 85000, color: "#279D2E" },
    { nombre: "BBVA", monto: 42000, color: "#001391" },
    { nombre: "Mercado Pago Crédito", monto: 27500, color: "#00BCFF" },
  ];

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
      <Text style={{ color: Colors.dark.text, fontSize: 20 }}>Tarjetas</Text>
      {tarjetasFicticias.map((tarjeta) => (
        <GastoItem
          key={tarjeta.nombre}
          titulo={tarjeta.nombre}
          monto={tarjeta.monto}
          icono="card-outline"
          color={tarjeta.color}
        />
      ))}
    </View>
  );
}
