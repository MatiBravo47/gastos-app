import { formatearMonto } from "@/utils/format";
import { Text, View } from "react-native";

type Props = {
  total: number;
};
export default function TotalGastos({ total }: Props) {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          color: "#e0e0e0",
        }}
      >
        ${formatearMonto(total)}
      </Text>
    </View>
  );
}
