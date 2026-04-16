import { Categoria } from "@/types/Categoria";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

type Props = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  categorias: Categoria[];
};

export default function CategoryPicker({
  label,
  selectedValue,
  onValueChange,
  categorias,
}: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ marginBottom: 4, color: "#333" }}>{label}</Text>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 6,
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          paddingVertical: 1,
        }}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Picker.Item label="Sin categoria" value="" />

          {categorias.map((cat) => (
            <Picker.Item
              key={cat.nombre}
              label={cat.nombre}
              value={cat.nombre}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
