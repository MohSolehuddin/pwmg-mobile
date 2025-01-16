import ButtonWithIcon from "@/components/ButtonWithIcon";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Stack, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, Alert } from "react-native";
import * as schema from "../../src/db/schema";
import { eq } from "drizzle-orm";
import { deletePasswords } from "@/src/redux/features/passwordSlice";
import ModalContainer from "@/components/ModalContainer";
import UpdatePassword from "@/components/updatePassword";
import { useState } from "react";
import copyTextToClipboard from "@/src/utils/copyTextToClipboard";
const passwordDetail = () => {
  const { selectedPasswordDetail } = useAppSelector(
    (state) => state.passwordDetail
  );
  const router = useRouter();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await drizzleDb
        .delete(schema.password)
        .where(eq(schema.password.id, selectedPasswordDetail.id));
      dispatch(deletePasswords(selectedPasswordDetail.id));
      alertDeleteSuccess();
    } catch (error) {
      console.log(error);
      alertDeleteFailed();
    }
  };
  const confirmDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this password", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => handleDelete(),
        style: "destructive",
      },
    ]);
  };
  const alertDeleteSuccess = () => {
    Alert.alert("Success", "Password deleted successfully", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
    router.back();
  };
  const alertDeleteFailed = () => {
    Alert.alert("Failed", "Password deletion failed", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  };

  const handleOnUpdate = () => {
    try {
      setIsModalVisible(true);
    } catch (error) {
      console.log(error);
      updateFailed();
    }
  };
  const updateSuccess = () => {
    Alert.alert("Success", "Password updated successfully", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  };
  const updateFailed = () => {
    Alert.alert("Failed", "Password update failed", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  };

  const RenderText = ({
    text,
    title,
    icon,
  }: {
    text: any;
    title: any;
    icon: any;
  }) => (
    <View className="border-b-2 border-white rounded-xl py-2 flex gap-2">
      <View className="flex flex-row gap-4">
        {icon && <MaterialIcons name={icon} size={24} color="white" />}
        <Text className="flex-auto text-white">{title}</Text>
      </View>
      <View className="flex flex-row justify-between flex-initial">
        <Text className="text-white w-4/5">{text}</Text>
        <MaterialIcons
          name="content-copy"
          size={24}
          color="white"
          className="w-6"
          onPress={() => copyTextToClipboard(text)}
        />
      </View>
    </View>
  );
  return (
    <>
      <Stack.Screen
        options={{
          title: "Password Detail",
          headerStyle: { backgroundColor: Colors.light.tint },
        }}
      />
      <View className="w-screen h-screen p-6 flex gap-6">
        <View className="w-full bg-mainBlue px-6 py-4 rounded-3xl  flex gap-6">
          <RenderText
            text={selectedPasswordDetail?.category}
            icon={"folder"}
            title={"Category"}
          />
          <RenderText
            text={selectedPasswordDetail?.username}
            icon={"people"}
            title={"Username"}
          />
          <RenderText
            text={selectedPasswordDetail?.email}
            icon={"email"}
            title={"Email"}
          />
          <RenderText
            text={selectedPasswordDetail?.password}
            icon={"lock"}
            title={"Password"}
          />
          <RenderText
            text={selectedPasswordDetail?.pin}
            icon={"lock"}
            title={"Pin"}
          />
        </View>
        <View className="flex flex-row gap-4 flex-shrink-0 w-full justify-between">
          <ButtonWithIcon
            text="Delete"
            iconName="delete"
            onPress={confirmDelete}
            className="bg-error w-40"
          />
          <ButtonWithIcon
            text="Update"
            iconName="update"
            onPress={handleOnUpdate}
            className="w-64 bg-mainBlue"
          />
        </View>
      </View>
      <ModalContainer isOpen={isModalVisible} setIsOpen={setIsModalVisible}>
        <UpdatePassword setIsModalOpen={setIsModalVisible} />
      </ModalContainer>
    </>
  );
};

export default passwordDetail;
