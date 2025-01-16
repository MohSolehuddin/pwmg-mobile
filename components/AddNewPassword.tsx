import { Text, View } from "react-native";
import TextInputWithStyle from "./TextInputWithStyle";
import Animated from "react-native-reanimated";
import CustomButton from "./CustomButton";
import { useRef, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../src/db/schema";
import ModalContainer from "./ModalContainer";
import { desc } from "drizzle-orm";
import { useAppDispatch } from "@/src/redux/hooks";
import { addNewPasswords } from "@/src/redux/features/passwordSlice";

interface AddNewPasswordProps {
  setIsModalOpen: any;
}
const AddNewPassword = ({ setIsModalOpen }: AddNewPasswordProps) => {
  let categoryRef = useRef<string>("");
  let usernameRef = useRef<string>("");
  let passwordRef = useRef<string>("");
  let emailRef = useRef<string>("");
  let pinRef = useRef<string>("");

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onAddPassword = async () => {
    try {
      await drizzleDb.insert(schema.password).values({
        category: categoryRef.current,
        username: usernameRef.current,
        password: passwordRef.current,
        email: emailRef.current,
        pin: pinRef.current,
        delete_at: "",
      });

      let createdData = await drizzleDb
        .select()
        .from(schema.password)
        .limit(1)
        .offset(0)
        .orderBy(desc(schema.password.id));
      dispatch(addNewPasswords(createdData[0]));
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccessModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Animated.View className="flex gap-6 h-full justify-center">
      <Text className="text-2xl font-bold text-mainBlue text-center">
        Add new password
      </Text>
      <ModalContainer
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}>
        <View className="w-full h-full flex justify-center items-center">
          <Text className="text-2xl font-bold text-mainBlue text-center">
            Successfully creating new login for category {categoryRef.current}
          </Text>
          <Text className="text-base font-bold text-gray-600 text-center">
            Automatically close in 2 seconds
          </Text>
        </View>
      </ModalContainer>
      <Animated.View className="flex gap-1">
        <TextInputWithStyle
          placeholder="Category"
          onChangeText={(text: string) => (categoryRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Username"
          onChangeText={(text: string) => (usernameRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Email"
          onChangeText={(text: string) => (emailRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Password"
          onChangeText={(text: string) => (passwordRef.current = text)}
        />
        <TextInputWithStyle
          placeholder="Pin"
          onChangeText={(text: string) => (pinRef.current = text)}
        />
      </Animated.View>
      <CustomButton onPress={onAddPassword} text="Save" />
    </Animated.View>
  );
};

export default AddNewPassword;
