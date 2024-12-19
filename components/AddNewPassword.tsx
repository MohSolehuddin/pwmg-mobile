import { Text } from "react-native";
import TextInputWithStyle from "./TextInputWithStyle";
import Animated from "react-native-reanimated";
import CustomButton from "./CustomButton";
import { useRef, useState } from "react";
import ModalContainer from "./ModalContainer";

interface Props {
  onSave: () => void;
}

const AddNewPassword = () => {
  const categoryRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const pinRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Animated.View className="flex gap-6 h-full justify-center">
      <Text className="text-2xl font-bold text-mainBlue text-center">
        Add new password
      </Text>
      <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Text>Category: {categoryRef.current}</Text>
        <Text>Username: {usernameRef.current}</Text>
        <Text>Password: {passwordRef.current}</Text>
        <Text>Email: {emailRef.current}</Text>
        <Text>Pin: {pinRef.current}</Text>
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
          placeholder="email"
          onChange={(e: any) => {
            emailRef.current = e.nativeEvent.text;
          }}
        />
        <TextInputWithStyle
          placeholder="Password"
          onChange={(e: any) => {
            passwordRef.current = e.nativeEvent.text;
          }}
        />
        <TextInputWithStyle
          placeholder="Pin"
          onChange={(e: any) => {
            pinRef.current = e.nativeEvent.text;
          }}
        />
      </Animated.View>
      <CustomButton
        onPress={() => {
          setIsOpen(true);
        }}
        text="Save"
      />
    </Animated.View>
  );
};

export default AddNewPassword;
