import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import GastosList from "@/components/FlatList";
import HeaderIndex from "@/components/HeaderIndex";
import TotalGastos from "@/components/totalGastos";
import { useGastosContext } from "@/context/GastosContext";
import { categorias } from "@/data/categorias";
import { useGastosResumen } from "@/hooks/useGastosResumen";
import { Gasto } from "@/types/Gasto";
import { router } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth());
  const [anio, setAnio] = useState(hoy.getFullYear());

  const { eliminarGasto } = useGastosContext();
  const { total, gastosAgrupados } = useGastosResumen(mes, anio);

  const [gastoSeleccionado, setGastoSeleccionado] = useState<Gasto | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const irMesAnterior = () => {
    if (mes === 0) {
      setMes(11);
      setAnio((a) => a - 1);
    } else {
      setMes((m) => m - 1);
    }
  };

  const irMesSiguiente = () => {
    const esMesActual = mes === hoy.getMonth() && anio === hoy.getFullYear();
    if (esMesActual) return;
    if (mes === 11) {
      setMes(0);
      setAnio((a) => a + 1);
    } else {
      setMes((m) => m + 1);
    }
  };

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
      <HeaderIndex
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

      {/* Modal de acciones */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle} numberOfLines={1}>
              {gastoSeleccionado?.descripcion}
            </Text>

            <TouchableOpacity style={styles.sheetBtn} onPress={handleEditar}>
              <Text style={styles.sheetBtnText}>✏️ Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetBtn, styles.sheetBtnDanger]}
              onPress={handleEliminar}
            >
              <Text style={[styles.sheetBtnText, styles.sheetBtnTextDanger]}>
                🗑️ Eliminar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetBtn, styles.sheetBtnCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.sheetBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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
