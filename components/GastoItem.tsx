import { formatearMonto } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  titulo: string;
  monto: number;
  icono: any;
  color: string;
  onPress?: () => void;
};

export default function GastoItem({
  titulo,
  monto,
  icono,
  color,
  onPress,
}: Props) {
  return (
    <View style={styles.gastoContainer}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${color}20`,
          },
        ]}
      >
        <Ionicons name={icono} size={24} color={color} />
      </View>

      <Text style={styles.descripcion} numberOfLines={1}>
        {titulo}
      </Text>

      <Text style={[styles.monto, { color: color }]}>
        $ {formatearMonto(monto)}
      </Text>

      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
          style={styles.menuBtn}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gastoContainer: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  descripcion: {
    flex: 1,
    fontWeight: "600",
    marginHorizontal: 12,
    color: "#e0e0e0",
    fontSize: 15,
  },

  monto: {
    fontWeight: "700",
    marginRight: 8,
    color: "#ffffff",
    fontSize: 15,
  },

  menuBtn: {
    padding: 4,
  },
});
