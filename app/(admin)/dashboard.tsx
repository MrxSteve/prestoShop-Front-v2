import { Text, View } from "react-native";

export default function AdminDashboard() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-purple-600">
        Dashboard Admin
      </Text>
      <Text className="text-gray-600 mt-2">
        Panel de control administrativo
      </Text>
    </View>
  );
}
