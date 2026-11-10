import { ImageSourcePropType } from "react-native";

export type MetodoPago = {
  id: string;
  nombre: string;
  icono: string;
  color: string;
  logo?: ImageSourcePropType;
};
