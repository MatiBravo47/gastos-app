import AppButton from "@/components/AppButton";
import CategoryPicker from "@/components/CategoryPicker";
import DatePickerField from "@/components/DatePickerField";
import InputField from "@/components/InputField";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function NewGastoScreen() {
  const { agregarGasto } = useGastosContext();

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [categoria, setCategoria] = useState("");

  const handleAgregar = () => {
    const montoNum = parseFloat(monto.replace(",", "."));

    if (!descripcion.trim()) {
      Alert.alert("Error", "Por favor ingresá una descripción.");
      return;
    }
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert("Error", "Por favor ingresá un monto válido mayor a 0.");
      return;
    }

    agregarGasto({
      id:
        typeof crypto !== "undefined"
          ? crypto.randomUUID()
          : Date.now().toString(),
      descripcion: descripcion.trim(),
      monto: montoNum,
      fecha: fecha.toISOString(),
      categoria,
    });

    // limpiar
    setDescripcion("");
    setMonto("");
    setFecha(new Date());
    setCategoria("");

    router.back(); // cerrar modal
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo gasto</Text>
      </View>

      <InputField
        label="Descripcion"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <InputField
        label="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />

      <CategoryPicker
        label="Categoria"
        selectedValue={categoria}
        onValueChange={setCategoria}
        categorias={categorias}
      />

      <DatePickerField label="Fecha" value={fecha} onChange={setFecha} />

      <View style={styles.buttonContainer}>
        <AppButton title="Guardar" onPress={handleAgregar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: "black",
    padding: 14,
    borderRadius: 8,
  },
});
