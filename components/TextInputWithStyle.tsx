import { TextInput } from "react-native";

const TextInputWithStyle = ({ ...props }) => {
  return (
    <TextInput
      {...props}
      className="bg-gray-100 rounded-3xl pl-6 px-2 py-4 w-full mb-6"
    />
  );
};

export default TextInputWithStyle;
