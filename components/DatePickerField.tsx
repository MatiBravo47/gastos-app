import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
};

export default function DatePickerField({ label, value, onChange }: Props) {
  const [mostrarPicker, setMostrarPicker] = useState(false);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ marginBottom: 4, color: "#e0e0e0" }}>{label}</Text>
      <View style={styles.dateInput}>
        <View>
          <Text style={{ fontSize: 16 }}>{value.toLocaleDateString()}</Text>
        </View>

        <Ionicons
          name="calendar"
          size={24}
          color="black"
          onPress={() => setMostrarPicker(true)}
        />
      </View>

      {mostrarPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarPicker(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});
