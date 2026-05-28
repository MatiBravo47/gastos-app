import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderIndex() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View>
        <Text style={{ color: Colors.dark.text, fontSize: 26 }}>
          Mis gastos
        </Text>
      </View>

      {/* Botón agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/modal/new")}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: Colors.dark.background,
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "300",
  },
});
