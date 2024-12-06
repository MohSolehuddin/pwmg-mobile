import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

interface PasswordCardProps {
  id: string;
  title: string;
  strength: string;
  password: string;
}

const PasswordCard = ({ id, title, strength, password }: PasswordCardProps) => {
  const router = useRouter();
  const handleLongPress = () => {
    let message: string;

    if (strength === "Strong") {
      message = "This password is strong, keep it safe";
    } else if (strength === "Weak") {
      message = "This password is weak, please change it";
    } else if (strength === "Good") {
      message = "This password is good, keep it safe";
    } else if (strength === "Fair") {
      message = "This password is fair, please change it";
    }
    if (message) {
      Alert.alert("Info", message);
    }
  };

  return (
    <View className="flex-row items-center justify-between bg-secondaryBlue py-4 px-6 rounded-xl">
      <View className="flex-row items-center gap-6">
        <Image
          source={require("../assets/images/undraw_Mobile_encryption_re_yw3o.png")}
          className="w-12 h-12 rounded-lg"
        />
        <Text className="text-white font-bold">{title}</Text>
      </View>
      <View className="flex-row items-center gap-6">
        <TouchableOpacity onPress={handleLongPress}>
          {strength === "Strong" && (
            <MaterialIcons name="lock" size={24} color="#009FFF" />
          )}
          {strength === "Weak" && (
            <MaterialIcons
              name="error"
              size={24}
              color="#F44336"
              className="bg-white rounded-full"
            />
          )}
          {strength === "Good" && (
            <MaterialIcons name="lock-open" size={24} color="#93FCF8" />
          )}
          {strength === "Fair" && (
            <MaterialIcons name="lock-open" size={24} color="#FFE31A" />
          )}
        </TouchableOpacity>
        <MaterialIcons
          name="more-vert"
          size={24}
          color="white"
          onPress={() => router.push(`./passwordDetail`)}
        />
      </View>
    </View>
  );
};

export default PasswordCard;
