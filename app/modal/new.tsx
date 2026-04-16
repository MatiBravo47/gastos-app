import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";

import CategoryPicker from "@/components/CategoryPicker";
import DatePickerField from "@/components/DatePickerField";
import InputField from "@/components/InputField";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";

export default function NewGastoScreen() {
  const { agregarGasto } = useGastosContext();

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [categoria, setCategoria] = useState("");

  const handleAgregar = () => {
    if (!descripcion || !monto) return;

    agregarGasto({
      id: Date.now().toString(),
      descripcion,
      monto: parseFloat(monto),
      fecha: fecha.toLocaleDateString(),
      categoria,
    });

    // limpiar (opcional)
    setDescripcion("");
    setMonto("");
    setFecha(new Date());
    setCategoria("");

    router.back(); // cerrar modal
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Nuevo gasto</Text>

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

      <Button title="Agregar" onPress={handleAgregar} />
      <Button title="Cancelar" onPress={() => router.back()} />
    </View>
  );
}
