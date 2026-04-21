import { Text, View } from "react-native";

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
        ${total}
      </Text>

      <Text style={{ textAlign: "center", fontSize: 17, marginBottom: 10 }}>
        Gasto mensual
      </Text>
    </View>
  );
}
