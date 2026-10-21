import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

type Opcion = {
  nombre: string;
  icono: string;
  color: string;
};

type Props = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  opciones: Opcion[];
  placeholder?: string;
};

export default function CustomPicker({
  label,
  selectedValue,
  onValueChange,
  opciones,
  placeholder = "Seleccionar...",
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.pickerInput}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={placeholder} value="" />

          {opciones.map((opcion) => (
            <Picker.Item
              key={opcion.nombre}
              label={opcion.nombre}
              value={opcion.nombre}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    color: "#e0e0e0",
  },
  pickerInput: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    paddingVertical: 1,
  },
  picker: {
    paddingHorizontal: 10,
    color: "#000000",
  },
});
