import { useAuth } from "../../src/contexts/AuthContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function AdminPerfil() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-2xl font-bold text-purple-600 mb-4">
        Perfil Admin
      </Text>
      <Text className="text-gray-600 mb-2">Usuario: {user?.nombre}</Text>
      <Text className="text-gray-600 mb-6">Rol: Administrador</Text>

      <TouchableOpacity
        onPress={logout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
