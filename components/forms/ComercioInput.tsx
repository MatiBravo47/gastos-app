import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  comercios: string[];
};

export default function ComercioInput({
  value,
  onChangeText,
  comercios,
}: Props) {
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const sugerencias = useMemo(() => {
    const texto = value.trim().toLocaleLowerCase();

    if (!texto) return [];

    return [...new Set(comercios)]
      .filter(
        (comercio) =>
          comercio.toLocaleLowerCase().includes(texto) &&
          comercio.toLocaleLowerCase() !== texto,
      )
      .slice(0, 5);
  }, [comercios, value]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comercio</Text>

      <TextInput
        value={value}
        onChangeText={(texto) => {
          onChangeText(texto);
          setMostrarSugerencias(true);
        }}
        onFocus={() => setMostrarSugerencias(true)}
        placeholder="Ej.: Carrefour"
        placeholderTextColor="#777"
        style={styles.input}
      />

      {mostrarSugerencias && sugerencias.length > 0 && (
        <View style={styles.suggestions}>
          {sugerencias.map((comercio) => (
            <Pressable
              key={comercio}
              style={styles.suggestion}
              onPress={() => {
                onChangeText(comercio);
                setMostrarSugerencias(false);
              }}
            >
              <Text style={styles.suggestionText}>{comercio}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    zIndex: 1,
  },
  label: {
    marginBottom: 4,
    color: "#e0e0e0",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  suggestions: {
    backgroundColor: "#252525",
    borderRadius: 6,
    marginTop: 4,
    overflow: "hidden",
  },
  suggestion: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#555",
  },
  suggestionText: {
    color: "#e0e0e0",
  },
});
