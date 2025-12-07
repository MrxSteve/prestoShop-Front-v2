import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      console.log("ENVIANDO LOGIN:", { email, password });

      const response = await login({ email, password });

      console.log("RESPUESTA LOGIN:", response);
    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <FontAwesome name="lock" size={32} color="white" />
          </View>
          <Text style={styles.title}>Iniciar Sesión</Text>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={18} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="email@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="key" size={18} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <FontAwesome
              name={showPass ? "eye-slash" : "eye"}
              size={18}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.button}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "flex-start",
    padding: 24,
    paddingTop: 80,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  iconCircle: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 100,
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },

  label: {
    color: "#374151",
    fontWeight: "600",
    marginBottom: 4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1f2937",
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
