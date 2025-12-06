import { Text, View } from "react-native";

export default function ClienteCatalogos() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">Catálogos</Text>
      <Text className="text-gray-600 mt-2">Ver productos disponibles</Text>
    </View>
  );
}
