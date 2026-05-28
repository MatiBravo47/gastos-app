import { Alert, StyleSheet, View } from "react-native";

import GastosList from "@/components/FlatList";
import GastoActionsModal from "@/components/GastoActionsModal";
import HeaderIndex from "@/components/HeaderIndex";
import MesNavigator from "@/components/MesNavigator";
import TotalGastos from "@/components/totalGastos";
import { Colors } from "@/constants/theme";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import { Gasto } from "@/types/Gasto";
import { router } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();
  const { eliminarGasto } = useGastosContext();
  const { total, gastosAgrupados } = useGastosResumen(mes, anio);
  const [gastoSeleccionado, setGastoSeleccionado] = useState<Gasto | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPress = (gasto: Gasto) => {
    setGastoSeleccionado(gasto);
    setModalVisible(true);
  };

  const handleEditar = () => {
    setModalVisible(false);
    if (gastoSeleccionado) {
      router.push({
        pathname: "/modal/edit",
        params: { id: gastoSeleccionado.id },
      });
    }
  };

  const handleEliminar = () => {
    setModalVisible(false);
    if (!gastoSeleccionado) return;
    Alert.alert(
      "Eliminar gasto",
      `¿Eliminar "${gastoSeleccionado.descripcion}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarGasto(gastoSeleccionado.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <HeaderIndex />

      <MesNavigator
        mes={mes}
        anio={anio}
        onAnterior={irMesAnterior}
        onSiguiente={irMesSiguiente}
      />

      <TotalGastos total={total} />

      <GastosList
        gastosAgrupados={gastosAgrupados}
        categorias={categorias}
        onAccionesGasto={handleLongPress}
      />
      <GastoActionsModal
        visible={modalVisible}
        gasto={gastoSeleccionado}
        onClose={() => setModalVisible(false)}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    gap: 10,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
    textAlign: "center",
  },
  sheetBtn: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  sheetBtnDanger: {
    backgroundColor: "#fff0f0",
  },
  sheetBtnCancel: {
    backgroundColor: "#e8e8e8",
    marginTop: 4,
  },
  sheetBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  sheetBtnTextDanger: {
    color: "#cc2200",
  },
});
