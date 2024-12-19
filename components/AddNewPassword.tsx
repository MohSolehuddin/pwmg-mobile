import { Text } from "react-native";
import TextInputWithStyle from "./TextInputWithStyle";
import Animated from "react-native-reanimated";
import CustomButton from "./CustomButton";
import { useEffect, useRef, useState } from "react";
import ModalContainer from "./ModalContainer";

interface Props {
  onSave: () => void;
}

const AddNewPassword = ({ onSave }: Props) => {
  const categoryRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(categoryRef.current);
  }, [categoryRef]);

  return (
    <Animated.View className="flex gap-6 h-full justify-center">
      <Text className="text-2xl font-bold text-mainBlue text-center">
        Add new password
      </Text>
      <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Text>{categoryRef.current}</Text>
        <Text>{usernameRef.current}</Text>
        <Text>{passwordRef.current}</Text>
        <Text>{emailRef.current}</Text>
      </ModalContainer>
      <Animated.View className="flex gap-1">
        <TextInputWithStyle
          placeholder="Category"
          onChange={(e: any) => {
            categoryRef.current = e.nativeEvent.text;
          }}
        />
        <TextInputWithStyle
          placeholder="Username"
          onChange={(e: any) => {
            usernameRef.current = e.nativeEvent.text;
          }}
        />
        <TextInputWithStyle
          placeholder="Password"
          onChange={(e: any) => {
            passwordRef.current = e.nativeEvent.text;
          }}
        />
        <TextInputWithStyle
          placeholder="gmail"
          onChange={(e: any) => {
            emailRef.current = e.nativeEvent.text;
          }}
        />
      </Animated.View>
      <CustomButton
        onPress={() => {
          onSave;
          setIsOpen(true);
        }}
        text="Save"
      />
    </Animated.View>
  );
};

export default AddNewPassword;
