import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import {
    Slot,
    useNavigationContainerRef,
    useRouter,
    useSegments,
} from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    const unsubscribe = navigationRef?.addListener("state", () => {
      setIsNavigationReady(true);
    });
    return unsubscribe;
  }, [navigationRef]);

  useEffect(() => {
    if (!isNavigationReady) return;
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    // Usuario no autenticado debe estar en login
    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
      return;
    }

    // Usuario autenticado en login debe ir a su panel
    if (user && inAuthGroup) {
      if (user.role === "admin") {
        router.replace("/(admin)/dashboard");
      } else {
        router.replace("/(cliente)/home");
      }
      return;
    }

    // Admin intentando acceder a área de cliente
    if (user && user.role === "admin" && segments[0] === "(cliente)") {
      router.replace("/(admin)/dashboard");
      return;
    }

    // Cliente intentando acceder a área de admin
    if (user && user.role === "cliente" && segments[0] === "(admin)") {
      router.replace("/(cliente)/home");
      return;
    }
  }, [user, segments, isLoading, router, isNavigationReady]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
