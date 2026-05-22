import { Gasto } from "@/types/Gasto";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  gasto: Gasto | null;
  onClose: () => void;
  onEditar: () => void;
  onEliminar: () => void;
};

export default function GastoActionsModal({
  visible,
  gasto,
  onClose,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle} numberOfLines={1}>
            {gasto?.descripcion}
          </Text>

          <TouchableOpacity style={styles.sheetBtn} onPress={onEditar}>
            <Text style={styles.sheetBtnText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sheetBtn, styles.sheetBtnDanger]}
            onPress={onEliminar}
          >
            <Text style={[styles.sheetBtnText, styles.sheetBtnTextDanger]}>
              Eliminar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sheetBtn, styles.sheetBtnCancel]}
            onPress={onClose}
          >
            <Text style={styles.sheetBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
