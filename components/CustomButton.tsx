import { Text, TouchableOpacity } from "react-native";
interface CustomButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  text: string;
}
const CustomButton = ({ text, ...props }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className="flex justify-center items-center bg-mainBlue rounded-3xl w-full h-[50px]">
      <Text className="text-white text-center font-extrabold text-2xl">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
