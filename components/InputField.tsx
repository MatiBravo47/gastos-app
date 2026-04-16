import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric";
};

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ marginBottom: 4, color: "#333" }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          borderWidth: 1,
          borderRadius: 6,
          backgroundColor: "#f5f5f5",
        }}
      />
    </View>
  );
}
