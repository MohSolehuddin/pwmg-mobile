import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

interface ButtonWithIconProps {
  onPress: () => void;
  iconName: string | any;
  text: string;
  className?: string;
}
const ButtonWithIcon = ({
  text,
  iconName = "delete",
  className,
  onPress,
}: ButtonWithIconProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-row justify-center items-center gap-4 rounded-3xl h-[50px] ${className}`}>
      <MaterialIcons name={iconName} size={24} color="white" className="w-6" />
      <Text className="text-white text-center font-extrabold text-xl w-fit">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
