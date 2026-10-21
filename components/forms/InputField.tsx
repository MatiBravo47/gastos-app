import { StyleSheet, Text, TextInput, View } from "react-native";
type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  currency?: boolean;
};

function formatearEntradaMonto(text: string) {
  // Los puntos de miles se generan automáticamente.
  const limpio = text.replace(/[^\d,]/g, "");
  const [entero = "", ...decimales] = limpio.split(",");
  const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const tieneComa = limpio.includes(",");
  const parteDecimal = decimales.join("").slice(0, 2);

  return tieneComa ? `${enteroFormateado},${parteDecimal}` : enteroFormateado;
}

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  currency = false,
}: Props) {
  const handleChangeText = (text: string) => {
    onChangeText(currency ? formatearEntradaMonto(text) : text);
  };

  return (
    <View style={styles.field}>
      <Text style={styles.labelForm}>{label}</Text>

      <View style={styles.inputContainer}>
        {currency && <Text style={styles.currencyPrefix}>$</Text>}

        <TextInput
          value={value}
          onChangeText={handleChangeText}
          keyboardType={currency ? "decimal-pad" : keyboardType}
          style={styles.inputForm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 10,
  },
  inputContainer: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
  },
  inputForm: {
    flex: 1,
    paddingVertical: 10,
    color: "#111827",
  },
  currencyPrefix: {
    marginRight: 8,
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  labelForm: {
    marginBottom: 4,
    color: "#e0e0e0",
  },
});
