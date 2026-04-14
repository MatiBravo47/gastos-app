import { FlatList, Text, View } from "react-native";
import GastoItem from "./GastoItem";

type gasto = {
  id: string;
  descripcion: string;
  monto: number;
  fecha: string;
  categoria: string;
};

type categoria = {
  nombre: string;
  icono: string;
  color: string;
};

type Props = {
  gastosAgrupados: Record<string, gasto[]>;
  categorias: categoria[];
};

export default function GastosList({ gastosAgrupados, categorias }: Props) {
  const fechas = Object.keys(gastosAgrupados);
  return (
    <FlatList
      data={fechas}
      keyExtractor={(item) => item}
      renderItem={({ item: fecha }) => (
        <View style={{ marginBottom: 15 }}>
          <Text
            style={{
              color: "#333",
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 5,
              backgroundColor: "#f5f5f5",
            }}
          >
            {fecha}
          </Text>

          {gastosAgrupados[fecha].map((gasto) => (
            <GastoItem key={gasto.id} gasto={gasto} categorias={categorias} />
          ))}
        </View>
      )}
    />
  );
}
