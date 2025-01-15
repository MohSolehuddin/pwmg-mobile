import { Text } from "react-native";
import SafeAreaShell from "@/components/SafeAreaShell";

const Setting = () => {
  interface Row {
    id: number;
    value: string;
    intValue: number;
  }

  return (
    <SafeAreaShell>
      <Text className="text-black">setting</Text>
    </SafeAreaShell>
  );
};

export default Setting;
