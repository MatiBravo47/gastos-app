import AppButton from "@/components/AppButton";
import ComercioInput from "@/components/forms/ComercioInput";
import CustomPicker from "@/components/forms/CustomPicker";
import DatePickerField from "@/components/forms/DatePickerField";
import InputField from "@/components/forms/InputField";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { metodosPago } from "@/data/metodosPago";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function NewGastoScreen() {
  const { agregarGasto, agregarSuscripcion, gastos } = useGastosContext();

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [categoria, setCategoria] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo/Debito");
  const [cuotas, setCuotas] = useState("1");

  const esSuscripcion = categoria === "Suscripciones";

  const metodoSeleccionado = metodosPago.find(
    (metodo) => metodo.nombre === metodoPago,
  );

  const requiereCuotas =
    !esSuscripcion && metodoSeleccionado?.tipo === "credito";

  const comercios = gastos.map((gasto) => gasto.descripcion);

  const handleAgregar = () => {
    const montoNum = Number(monto.replace(/\./g, "").replace(",", "."));

    if (!descripcion.trim()) {
      Alert.alert("Error", "Por favor ingresá una descripción.");
      return;
    }

    if (!Number.isFinite(montoNum) || montoNum <= 0) {
      Alert.alert("Error", "Por favor ingresá un monto válido mayor a 0.");
      return;
    }

    if (!metodoPago) {
      Alert.alert("Error", "Por favor elegí un método de pago.");
      return;
    }

    const id =
      typeof crypto !== "undefined"
        ? crypto.randomUUID()
        : Date.now().toString();

    if (esSuscripcion) {
      const mesInicio = `${fecha.getFullYear()}-${String(
        fecha.getMonth() + 1,
      ).padStart(2, "0")}`;

      agregarSuscripcion({
        id,
        nombre: descripcion.trim(),
        metodoPago,
        diaCobro: fecha.getDate(),
        historialPrecios: [{ desdeMes: mesInicio, monto: montoNum }],
      });
    } else {
      agregarGasto({
        id,
        descripcion: descripcion.trim(),
        monto: montoNum,
        fecha: fecha.toISOString(),
        categoria,
        metodoPago,
        cuotas: requiereCuotas ? Number(cuotas) : 1,
      });
    }

    setDescripcion("");
    setMonto("");
    setFecha(new Date());
    setCategoria("");
    setMetodoPago("Efectivo/Debito");
    setCuotas("1");

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo gasto</Text>
      </View>

      <ComercioInput
        value={descripcion}
        onChangeText={setDescripcion}
        comercios={comercios}
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

      {esSuscripcion && (
        <Text style={styles.subscriptionNote}>
          Se cobrará todos los meses hasta que la canceles.
        </Text>
      )}

      <CustomPicker
        label="Método de pago"
        selectedValue={metodoPago}
        onValueChange={setMetodoPago}
        opciones={metodosPago}
        placeholder="Seleccionar método..."
      />

      {requiereCuotas && (
        <CustomPicker
          label="Cantidad de cuotas"
          selectedValue={cuotas}
          onValueChange={setCuotas}
          opciones={Array.from({ length: 24 }, (_, i) => ({
            nombre: String(i + 1),
            icono: "card-outline",
            color: "#78909C",
          }))}
          placeholder="Elegir cuotas"
        />
      )}

      <DatePickerField label="Fecha" value={fecha} onChange={setFecha} />

      <View style={styles.buttonContainer}>
        <AppButton title="Guardar" onPress={handleAgregar} />
        <AppButton title="Cancelar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1b1717",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
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
  subscriptionNote: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 10,
  },
});
