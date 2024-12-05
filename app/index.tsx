import OnboardingScreen from "@/app/onboarding";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
export default function Onboarding() {
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState(true);

  if (isFirstTime) {
    return <OnboardingScreen />;
  }
  return (
    <View>
      <Text>Welcome to Onboarding</Text>
      <OnboardingScreen />
      <Button
        title="klik"
        onPress={() => {
          router.push("/(tabs)");
        }}></Button>
    </View>
  );
}
