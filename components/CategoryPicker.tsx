import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

type Categoria = {
  nombre: string;
  icono: string;
  color: string;
};

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
          borderColor: "#ddd",
          borderRadius: 6,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
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
