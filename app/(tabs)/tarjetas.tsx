import HeaderIndex from "@/components/HeaderIndex";
import MesNavigator from "@/components/MesNavigator";
import MetodoPagoItem from "@/components/MetodoPagoItem";
import TotalGastos from "@/components/totalGastos";
import { Colors } from "@/constants/theme";
import { useGastosContext } from "@/context/GastosContext";
import { metodosPago } from "@/data/metodosPago";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();
  const { total } = useGastosResumen(mes, anio);
  const { gastos } = useGastosContext();

  const gastosDelMes = gastos.filter((gasto) => {
    const fecha = new Date(gasto.fecha);
    return fecha.getMonth() === mes && fecha.getFullYear() === anio;
  });

  const totalesPorMetodo = gastosDelMes.reduce<Record<string, number>>(
    (totales, gasto) => {
      totales[gasto.metodoPago] =
        (totales[gasto.metodoPago] ?? 0) + gasto.monto;
      return totales;
    },
    {},
  );

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
        Medios de pago
      </Text>

      {metodosPago.map((metodo) => (
        <MetodoPagoItem
          key={metodo.id}
          metodo={metodo}
          monto={totalesPorMetodo[metodo.nombre] ?? 0}
        />
      ))}
    </View>
  );
}
