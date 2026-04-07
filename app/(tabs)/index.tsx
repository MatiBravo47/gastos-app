import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  const [fecha, setFecha] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const [monto, setMonto] = useState("");
  const [gastos, setGastos] = useState<
    {
      id: string;
      descripcion: string;
      monto: number;
      fecha: string;
      categoria: string;
    }[]
  >([]);

  const categorias = ["Comida", "Transporte", "Ocio", "Servicios", "Otros"];

  const agregarGasto = () => {
    if (!descripcion || !monto) return;

    const nuevoGasto = {
      id: Date.now().toString(),
      descripcion,
      monto: parseFloat(monto),
      fecha: fecha.toLocaleDateString(),
      categoria,
    };

    setGastos([...gastos, nuevoGasto]);
    setDescripcion("");
    setMonto("");
    setCategoria("");
    setFecha(new Date());
  };

  const total = gastos.reduce((acc, g) => acc + g.monto, 0);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
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

      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={{ marginBottom: 10 }}
      >
        <Picker.Item label="Seleccionar categoría" value="" />

        {categorias.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      <Text style={{ marginBottom: 10 }}>
        Fecha: {fecha.toLocaleDateString()}
      </Text>

      <View style={{ gap: 10 }}>
        <Button
          title="Seleccionar fecha"
          onPress={() => setMostrarPicker(true)}
        />

        {mostrarPicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setMostrarPicker(false);
              if (selectedDate) {
                setFecha(selectedDate);
              }
            }}
          />
        )}

        <Button title="Agregar" onPress={agregarGasto} />
      </View>
      <Text style={{ color: "black" }}>Total: ${total}</Text>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.descripcion} - ${item.monto} - {item.categoria} - {item.fecha}
          </Text>
        )}
      />
    </View>
  );
}
