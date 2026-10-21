import AppButton from "@/components/AppButton";
import CustomPicker from "@/components/forms/CustomPicker";
import DatePickerField from "@/components/forms/DatePickerField";
import InputField from "@/components/forms/InputField";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { metodosPago } from "@/data/metodosPago";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function EditGastoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { gastos, editarGasto } = useGastosContext();

  const gasto = gastos.find((g) => g.id === id);

  const [descripcion, setDescripcion] = useState(gasto?.descripcion ?? "");
  const [monto, setMonto] = useState(gasto ? String(gasto.monto) : "");
  const [fecha, setFecha] = useState(
    gasto ? new Date(gasto.fecha) : new Date(),
  );
  const [categoria, setCategoria] = useState(gasto?.categoria ?? "");
  const [metodoPago, setMetodoPago] = useState("");

  const handleGuardar = () => {
    const montoNum = Number(monto.replace(/\./g, "").replace(",", "."));

    if (!descripcion.trim()) {
      Alert.alert("Error", "Por favor ingresá una descripción.");
      return;
    }
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert("Error", "Por favor ingresá un monto válido mayor a 0.");
      return;
    }

    if (!metodoPago) {
      Alert.alert("Error", "Por favor elegí un método de pago.");
      return;
    }

    editarGasto({
      id: id!,
      descripcion: descripcion.trim(),
      monto: montoNum,
      fecha: fecha.toISOString(),
      categoria,
      metodoPago,
    });

    router.back();
  };

  if (!gasto) {
    Alert.alert("Error", "Gasto no encontrado");
    router.back();
    return null;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0d1117" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar gasto</Text>
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
        currency
      />

      <CustomPicker
        label="Categoría"
        selectedValue={categoria}
        onValueChange={setCategoria}
        opciones={categorias}
        placeholder="Sin categoría"
      />

      <CustomPicker
        label="Método de pago"
        selectedValue={metodoPago}
        onValueChange={setMetodoPago}
        opciones={metodosPago}
        placeholder="Sin método de pago"
      />

      <DatePickerField label="Fecha" value={fecha} onChange={setFecha} />

      <View style={styles.buttonContainer}>
        <AppButton title="Guardar cambios" onPress={handleGuardar} />
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
    color: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 10,

    padding: 14,
    borderRadius: 8,
  },
});
