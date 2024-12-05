import { Text, TouchableOpacity } from "react-native";
const CustomButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex justify-center items-center bg-mainBlue rounded-3xl w-full h-[50px]">
      <Text className="text-white text-center font-extrabold text-2xl">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
