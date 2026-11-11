import AppButton from "@/components/AppButton";
import InputField from "@/components/forms/InputField";
import MesNavigator from "@/components/MesNavigator";
import { Colors } from "@/constants/theme";
import { useGastosContext } from "@/context/GastosContext";
import { useMesNavigator } from "@/hooks/useMesNavigator";
import type { Suscripcion } from "@/types/Suscripcion";
import { formatearMonto } from "@/utils/format";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const obtenerPeriodo = (mes: number, anio: number) =>
  `${anio}-${String(mes + 1).padStart(2, "0")}`;

function buscarPrecioVigente(suscripcion: Suscripcion, periodo: string) {
  return suscripcion.historialPrecios
    .filter((precio) => precio.desdeMes <= periodo)
    .sort((a, b) => b.desdeMes.localeCompare(a.desdeMes))[0]?.monto;
}

export default function SuscripcionesScreen() {
  const { suscripciones, editarSuscripcion } = useGastosContext();
  const { mes, anio, irMesAnterior, irMesSiguiente } = useMesNavigator();

  const [suscripcionId, setSuscripcionId] = useState<string | null>(null);
  const [montoEditado, setMontoEditado] = useState<{
    clave: string;
    valor: string;
  } | null>(null);

  const periodo = obtenerPeriodo(mes, anio);
  const seleccionada = suscripciones.find(
    (suscripcion) => suscripcion.id === suscripcionId,
  );

  const clavePrecio = seleccionada ? `${seleccionada.id}-${periodo}` : "";

  const precioVigente = seleccionada
    ? buscarPrecioVigente(seleccionada, periodo)
    : undefined;

  const monto =
    montoEditado?.clave === clavePrecio
      ? montoEditado.valor
      : precioVigente === undefined
        ? ""
        : String(precioVigente);

  const handleGuardarPrecio = () => {
    if (!seleccionada) return;

    const montoNum = Number(monto.replace(/\./g, "").replace(",", "."));

    if (!Number.isFinite(montoNum) || montoNum <= 0) {
      Alert.alert("Error", "Ingresá un precio válido mayor a 0.");
      return;
    }

    const historialPrecios = [
      ...seleccionada.historialPrecios.filter(
        (precio) => precio.desdeMes !== periodo,
      ),
      { desdeMes: periodo, monto: montoNum },
    ].sort((a, b) => a.desdeMes.localeCompare(b.desdeMes));

    editarSuscripcion({ ...seleccionada, historialPrecios });
    setMontoEditado(null);

    Alert.alert("Precio actualizado", `Se aplicará desde ${periodo}.`);
  };

  const handleFinalizar = () => {
    if (!seleccionada) return;

    Alert.alert(
      "Finalizar suscripción",
      `Se cobrará también durante ${periodo}. Después dejará de aparecer.`,
      [
        { text: "Volver", style: "cancel" },
        {
          text: "Finalizar",
          style: "destructive",
          onPress: () =>
            editarSuscripcion({ ...seleccionada, mesFin: periodo }),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Suscripciones</Text>

      <MesNavigator
        mes={mes}
        anio={anio}
        onAnterior={irMesAnterior}
        onSiguiente={irMesSiguiente}
      />

      {suscripciones.length === 0 ? (
        <Text style={styles.info}>
          Todavía no hay suscripciones. Para agregar una, creá un gasto y elegí
          la categoría Suscripciones.
        </Text>
      ) : (
        <>
          {suscripciones.map((suscripcion) => {
            const precio = buscarPrecioVigente(suscripcion, periodo);
            const finalizada =
              suscripcion.mesFin !== undefined && periodo > suscripcion.mesFin;

            return (
              <Pressable
                key={suscripcion.id}
                style={[
                  styles.item,
                  suscripcion.id === suscripcionId && styles.itemSelected,
                ]}
                onPress={() => setSuscripcionId(suscripcion.id)}
              >
                <Text style={styles.itemTitle}>{suscripcion.nombre}</Text>
                <Text style={styles.info}>
                  {precio === undefined
                    ? "Aún no comenzó en este mes"
                    : `$ ${formatearMonto(precio)}`}
                  {finalizada ? " · Finalizada" : ""}
                </Text>
              </Pressable>
            );
          })}

          {seleccionada && (
            <View style={styles.form}>
              <Text style={styles.info}>
                Precio nuevo vigente desde {periodo}
              </Text>

              <InputField
                label="Precio mensual"
                value={monto}
                onChangeText={(valor) =>
                  setMontoEditado({ clave: clavePrecio, valor })
                }
                keyboardType="numeric"
                currency
              />

              <AppButton
                title="Guardar precio desde este mes"
                onPress={handleGuardarPrecio}
              />

              {!seleccionada.mesFin && (
                <AppButton
                  title="Finalizar suscripción"
                  onPress={handleFinalizar}
                />
              )}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 20,
  },
  title: {
    marginTop: 14,
    marginBottom: 12,
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "700",
  },
  item: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#111827",
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  itemTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    color: "#9ca3af",
    marginTop: 6,
  },
  form: {
    marginTop: 12,
    gap: 10,
  },
});
