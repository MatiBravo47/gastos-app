import AppButton from "@/components/AppButton";
import CategoryPicker from "@/components/CategoryPicker";
import DatePickerField from "@/components/DatePickerField";
import InputField from "@/components/InputField";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!gasto) {
      Alert.alert("Error", "Gasto no encontrado");
      router.back();
    }
  }, [gasto]);

  const handleGuardar = () => {
    const montoNum = parseFloat(monto.replace(",", "."));

    if (!descripcion.trim()) {
      Alert.alert("Error", "Por favor ingresá una descripción.");
      return;
    }
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert("Error", "Por favor ingresá un monto válido mayor a 0.");
      return;
    }

    editarGasto({
      id: id!,
      descripcion: descripcion.trim(),
      monto: montoNum,
      fecha: fecha.toISOString(),
      categoria,
    });

    router.back();
  };

  if (!gasto) return null;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
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
      />

      <CategoryPicker
        label="Categoria"
        selectedValue={categoria}
        onValueChange={setCategoria}
        categorias={categorias}
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
