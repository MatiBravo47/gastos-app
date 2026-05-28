import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function AppButton({ title, onPress, style, textStyle }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1b1717",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "#e0e0e0",
    fontSize: 16,
    fontWeight: "bold",
  },
});
