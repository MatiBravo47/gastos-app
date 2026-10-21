import { GastosProvider } from "@/context/GastosContext";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GastosProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal/new"
            options={{
              presentation: "modal",
              title: "Nuevo gasto",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modal/edit"
            options={{
              presentation: "modal",
              title: "Editar gasto",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modal/category"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modal/MetodoPagoDetail"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </GastosProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
