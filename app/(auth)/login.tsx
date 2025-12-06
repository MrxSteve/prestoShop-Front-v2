import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor ingresa email y contraseña");
      return;
    }

    try {
      console.log("Intentando login con:", email);
      await login(email, password);
      console.log("Login exitoso");
      // La navegación se manejará automáticamente en el _layout.tsx raíz
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 p-6">
      <View className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
          PrestoShop
        </Text>
        <Text className="text-center text-gray-600 mb-8">
          Inicia sesión para continuar
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-semibold">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-semibold">Contraseña</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="bg-blue-600 rounded-lg py-4 items-center mb-4"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4 p-4 bg-gray-100 rounded-lg">
          <Text className="text-xs text-gray-600 text-center mb-2">
            Usuarios de prueba:
          </Text>
          <Text className="text-xs text-gray-600">
            • Cliente: cualquier email sin admin
          </Text>
          <Text className="text-xs text-gray-600">
            • Admin: email con admin (ej: admin@test.com)
          </Text>
        </View>
      </View>
    </View>
  );
}
