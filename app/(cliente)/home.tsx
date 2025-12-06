import { Text, View } from "react-native";

export default function ClienteHome() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">Home Cliente</Text>
      <Text className="text-gray-600 mt-2">Bienvenido al panel de cliente</Text>
    </View>
  );
}
