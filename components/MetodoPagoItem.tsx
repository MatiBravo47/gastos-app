import GastoItem from "@/components/GastoItem";
import { MetodoPago } from "@/types/MetodoPago";

type Props = {
  metodo: MetodoPago;
  monto: number;
  onPress?: () => void;
};

export default function MetodoPagoItem({ metodo, monto, onPress }: Props) {
  return (
    <GastoItem
      titulo={metodo.nombre}
      monto={monto}
      icono={metodo.icono}
      color={metodo.color}
      onPress={onPress}
    />
  );
}
