import CategoryPicker from "@/components/CategoryPicker";
import DatePickerField from "@/components/DatePickerField";
import GastosList from "@/components/FlatList";
import InputField from "@/components/InputField";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  const [fecha, setFecha] = useState(new Date());

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

  const categorias = [
    { nombre: "Comida", icono: "fast-food", color: "#FF7043" },
    { nombre: "Transporte", icono: "car", color: "#42A5F5" },
    { nombre: "Ocio", icono: "game-controller", color: "#66BB6A" },
    { nombre: "Servicios", icono: "construct", color: "#FFCA28" },
    { nombre: "Otros", icono: "apps", color: "#AB47BC" },
  ];

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

  const gastosAgrupados = gastos.reduce(
    (acc, gasto) => {
      if (!acc[gasto.fecha]) {
        acc[gasto.fecha] = [];
      }
      acc[gasto.fecha].push(gasto);
      return acc;
    },
    {} as Record<string, typeof gastos>,
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      {/*Pantalla completa*/}
      <View>
        {/*Formulario nuevo gasto*/}
        <Text style={{ fontSize: 20, margin: 20 }}>Registrar gasto</Text>

        {/*Descripcion*/}
        <InputField
          label="Descripcion"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/*Monto*/}
        <InputField
          label="Monto"
          value={monto}
          onChangeText={setMonto}
          keyboardType="numeric"
        />

        {/*Categoria*/}
        <CategoryPicker
          label="Categoria"
          selectedValue={categoria}
          onValueChange={setCategoria}
          categorias={categorias}
        />

        {/*DatePickerField*/}
        <DatePickerField label="Fecha" value={fecha} onChange={setFecha} />

        <Button title="Agregar" onPress={agregarGasto} />
      </View>
      <Text style={{ fontSize: 17, color: "black", margin: 20 }}>
        Total del mes: ${total}
      </Text>
      <GastosList gastosAgrupados={gastosAgrupados} categorias={categorias} />
    </View>
  );
}
