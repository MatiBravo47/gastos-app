import { Text, View } from "react-native";

export const formatearMonto = (monto: number) => {
  return new Intl.NumberFormat("es-AR").format(monto);
};

type Props = {
  total: number;
};
export default function TotalGastos({ total }: Props) {
  {
    /* TOTAL */
  }
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>
        ${formatearMonto(total)}
      </Text>

      <Text style={{ textAlign: "center", fontSize: 17, marginBottom: 10 }}>
        Gasto mensual
      </Text>
    </View>
  );
}
