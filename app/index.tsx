import OnboardingScreen from "@/screens/OnboardingScreen";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
export default function Onboarding() {
  const router = useRouter();
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
