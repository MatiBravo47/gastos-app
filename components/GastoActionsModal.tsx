import { Colors } from "@/constants/theme";
import type { Gasto } from "@/types/Gasto";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

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
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.sheet}
          onPress={(event) => event.stopPropagation()}
        >
          <View style={styles.handle} />

          <Text style={styles.title} numberOfLines={1}>
            {gasto?.descripcion ?? "Gasto"}
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.pressed,
            ]}
            onPress={onEditar}
            accessibilityRole="button"
          >
            <Ionicons name="create-outline" size={21} color="#D7DCDE" />
            <Text style={styles.actionText}>Editar gasto</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#8B9498"
              style={styles.trailingIcon}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.deleteButton,
              pressed && styles.pressed,
            ]}
            onPress={onEliminar}
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={21} color="#FF7777" />
            <Text style={styles.deleteText}>Eliminar gasto</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#C76A6A"
              style={styles.trailingIcon}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
            onPress={onClose}
            accessibilityRole="button"
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.68)",
  },
  sheet: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    gap: 10,
    backgroundColor: "#202426",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: "#343A3D",
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    marginBottom: 8,
    borderRadius: 2,
    backgroundColor: "#596064",
  },
  eyebrow: {
    color: "#9BA1A6",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
  },
  title: {
    color: Colors.dark.text,
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  actionButton: {
    minHeight: 54,
    paddingHorizontal: 16,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#343A3D",
    backgroundColor: "#292F31",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deleteButton: {
    backgroundColor: "#332426",
    borderColor: "#563236",
  },
  actionText: {
    color: "#E1E5E6",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteText: {
    color: "#FF8585",
    fontSize: 16,
    fontWeight: "600",
  },
  trailingIcon: {
    marginLeft: "auto",
  },
  cancelButton: {
    minHeight: 48,
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: "#252A2C",
  },
  cancelText: {
    color: "#BEC4C6",
    fontSize: 15,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.75,
  },
});
