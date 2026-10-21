import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          Colors[colorScheme === "dark" ? "dark" : "light"].tint,
        tabBarStyle: {
          backgroundColor: "#302929",
          borderTopColor: "#514747",
          borderTopWidth: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="grid-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tarjetas"
        options={{
          title: "Metodos de pago",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="card-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
