import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [gastos, setGastos] = useState<
    { id: string; descripcion: string; monto: number }[]
  >([]);

  const agregarGasto = () => {
    if (!descripcion || !monto) return;

    const nuevoGasto = {
      id: Date.now().toString(),
      descripcion,
      monto: parseFloat(monto),
    };

    setGastos([...gastos, nuevoGasto]);
    setDescripcion("");
    setMonto("");
  };

  const total = gastos.reduce((acc, g) => acc + g.monto, 0);

  return (
    <View style={{ padding: 20 }}>
      <Text>Registrar Gasto</Text>

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={{ borderWidth: 1, marginBottom: 10, backgroundColor: "white" }}
      />

      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, backgroundColor: "white" }}
      />

      <Button title="Agregar" onPress={agregarGasto} />

      <Text>Total: ${total}</Text>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.descripcion} - ${item.monto}
          </Text>
        )}
      />
    </View>
  );
}
