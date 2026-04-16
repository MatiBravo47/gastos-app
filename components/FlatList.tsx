import { Categoria } from "@/types/Categoria";
import { Gasto } from "@/types/Gasto";
import { FlatList, Text, View } from "react-native";
import GastoItem from "./GastoItem";

type Props = {
  gastosAgrupados: Record<string, Gasto[]>;
  categorias: Categoria[];
};

export default function GastosList({ gastosAgrupados, categorias }: Props) {
  const fechas = Object.keys(gastosAgrupados);

  return (
    <FlatList
      data={fechas}
      keyExtractor={(item) => item}
      renderItem={({ item: fecha }) => {
        const totalPorFecha = gastosAgrupados[fecha].reduce(
          (acc, g) => acc + g.monto,
          0,
        );

        return (
          <View style={{ marginBottom: 15 }}>
            {/* Header de fecha + total */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {fecha}
              </Text>

              <Text
                style={{
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                ${totalPorFecha}
              </Text>
            </View>

            {/* Lista de gastos */}
            {gastosAgrupados[fecha].map((gasto) => (
              <GastoItem key={gasto.id} gasto={gasto} categorias={categorias} />
            ))}
          </View>
        );
      }}
    />
  );
}
