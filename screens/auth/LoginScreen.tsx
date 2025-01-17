import CustomButton from "@/components/CustomButton";
import SafeAreaShell from "@/components/SafeAreaShell";
import TextInputWithStyle from "@/components/TextInputWithStyle";
import { useSQLiteContext } from "expo-sqlite";
import { useRef } from "react";
import { Text, View } from "react-native";
import * as schema from "../../src/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const usernameRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const handleOnLogin = async () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaShell>
      <View className="flex flex-1 items-center justify-center w-full h-full">
        <Text className="text-3xl text-center font-extrabold text-mainBlue">
          Login
        </Text>
        <TextInputWithStyle
          placeholder="Username"
          onChangeText={(text) => (usernameRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Password"
          onChangeText={(text) => (passwordRef.current = text)}
        />
        <CustomButton text="Login" onPress={handleOnLogin} />
      </View>
    </SafeAreaShell>
  );
};

export default LoginScreen;
