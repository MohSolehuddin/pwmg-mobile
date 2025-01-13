import { Text } from "react-native";
import TextInputWithStyle from "./TextInputWithStyle";
import Animated from "react-native-reanimated";
import CustomButton from "./CustomButton";
import { useRef } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../src/db/schema";
import passwordInterface from "@/src/interfaces/passwordInterfaces";

interface AddNewPasswordProps {
  setPasswords: any;
  passwords: passwordInterface[];
  setIsModalOpen: any;
}
const AddNewPassword = ({
  setPasswords,
  passwords,
  setIsModalOpen,
}: AddNewPasswordProps) => {
  let categoryRef = useRef<string>("");
  let usernameRef = useRef<string>("");
  let passwordRef = useRef<string>("");
  let emailRef = useRef<string>("");
  let pinRef = useRef<string>("");

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const onAddPassword = async () => {
    try {
      const newPassword: any = {
        category: categoryRef.current,
        username: usernameRef.current,
        password: passwordRef.current,
        email: emailRef.current,
        pin: pinRef.current,
        delete_at: "",
      };
      const createNewPassword = await drizzleDb.insert(schema.password).values({
        ...newPassword,
      });

      setPasswords([
        { id: createNewPassword.lastInsertRowId, ...newPassword },
        ...passwords,
      ]);
      console.log("createNewPassword", createNewPassword);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Animated.View className="flex gap-6 h-full justify-center">
      <Text className="text-2xl font-bold text-mainBlue text-center">
        Add new password
      </Text>
      {/* <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Text>Category: {categoryRef.current}</Text>
        <Text>Username: {usernameRef.current}</Text>
        <Text>Password: {passwordRef.current}</Text>
        <Text>Email: {emailRef.current}</Text>
        <Text>Pin: {pinRef.current}</Text>
      </ModalContainer> */}
      <Animated.View className="flex gap-1">
        <TextInputWithStyle
          placeholder="Category"
          onChangeText={(text) => (categoryRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Username"
          onChangeText={(text) => (usernameRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Email"
          onChangeText={(text) => (emailRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Password"
          onChangeText={(text) => (passwordRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Pin"
          onChangeText={(text) => (pinRef.current = text)}
        />
      </Animated.View>
      <CustomButton
        onPress={() => {
          // setIsOpen(true);
          setIsModalOpen(false);
          onAddPassword();
        }}
        text="Save"
      />
    </Animated.View>
  );
};

export default AddNewPassword;
