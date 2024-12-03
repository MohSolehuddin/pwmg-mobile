import { Text } from "react-native";
import React from "react";
import SafeAreaShell from "@/components/SafeAreaShell";
const setting = () => {
  return (
    <SafeAreaShell>
      <Text className="">{"setting".repeat(10000)}</Text>
    </SafeAreaShell>
  );
};

export default setting;
