import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

const passwordDetail = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Password Detail",
          headerStyle: { backgroundColor: Colors.light.tint },
        }}
      />
      <View className="w-screen h-screen py-4 px-6">
        <Text>passwordDetail</Text>
      </View>
    </>
  );
};

export default passwordDetail;
export const options = {
  title: "Password Detail",
  headerStyle: {
    backgroundColor: "#6200ee",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
};
