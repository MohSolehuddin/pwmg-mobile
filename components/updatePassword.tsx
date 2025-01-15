import { Text, View } from "react-native";
import TextInputWithStyle from "./TextInputWithStyle";
import Animated from "react-native-reanimated";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../src/db/schema";
import ModalContainer from "./ModalContainer";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { updatePasswords } from "@/src/redux/features/passwordSlice";
import { eq } from "drizzle-orm";
import { setSelectedPasswordDetail } from "@/src/redux/features/passwordDetailSlice";

interface UpdatePasswordProps {
  setIsModalOpen: any;
}
const UpdatePassword = ({ setIsModalOpen }: UpdatePasswordProps) => {
  const [category, setCategory] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pin, setPin] = useState<string>("");

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { selectedPasswordDetail } = useAppSelector(
    (state) => state.passwordDetail
  );

  useEffect(() => {
    if (selectedPasswordDetail) {
      setCategory(selectedPasswordDetail.category);
      setUsername(selectedPasswordDetail.username || "");
      setPassword(selectedPasswordDetail.password);
      setEmail(selectedPasswordDetail.email || "");
      setPin(selectedPasswordDetail.pin || "");
    }
  }, []);

  const onUpdatePassword = async () => {
    try {
      await drizzleDb
        .update(schema.password)
        .set({
          category: category,
          username: username,
          password: password,
          email: email,
          pin: pin,
          delete_at: "",
        })
        .where(eq(schema.password.id, selectedPasswordDetail.id));
      let updateData = await drizzleDb
        .select()
        .from(schema.password)
        .where(eq(schema.password.id, selectedPasswordDetail.id));
      dispatch(updatePasswords(updateData[0]));
      dispatch(setSelectedPasswordDetail(updateData[0]));
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccessModalOpen(false);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Animated.View className="flex gap-6 h-full justify-center">
      <Text className="text-2xl font-bold text-mainBlue text-center">
        Update password
      </Text>
      <ModalContainer
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}>
        <View className="w-full h-full flex justify-center items-center">
          <Text className="text-2xl font-bold text-mainBlue text-center">
            Successfully updating login for category {category}
          </Text>
          <Text className="text-base font-bold text-gray-600 text-center">
            Automatically close in 2 seconds
          </Text>
        </View>
      </ModalContainer>
      <Animated.View className="flex gap-1">
        <TextInputWithStyle
          placeholder="Category"
          value={category}
          onChangeText={(text) => setCategory(text)}
        />
        <TextInputWithStyle
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInputWithStyle
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInputWithStyle
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInputWithStyle
          placeholder="Pin"
          value={pin}
          onChangeText={(text) => setPin(text)}
        />
      </Animated.View>
      <CustomButton onPress={onUpdatePassword} text="Update" />
    </Animated.View>
  );
};

export default UpdatePassword;
