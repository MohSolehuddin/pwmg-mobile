import ButtonWithIcon from "@/components/ButtonWithIcon";
import { Colors } from "@/constants/Colors";
import { useAppSelector } from "@/src/redux/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { View, Text, Alert } from "react-native";

const passwordDetail = () => {
  const { selectedPasswordDetail } = useAppSelector(
    (state) => state.passwordDetail
  );
  const router = useRouter();

  const handleDelete = () => {
    try {
      console.log("delete", selectedPasswordDetail);
      deleteSuccess();
    } catch (error) {
      console.log(error);
      deleteFailed();
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
  const deleteSuccess = () => {
    Alert.alert("Success", "Password deleted successfully", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
    router.back();
  };
  const deleteFailed = () => {
    Alert.alert("Failed", "Password deletion failed", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  };

  const handleUpdate = () => {
    try {
      console.log("update", selectedPasswordDetail);
      updateSuccess();
    } catch (error) {
      console.log(error);
      updateFailed();
    }
  };
  const confirmUpdate = () => {
    Alert.alert("Update", "Are you sure you want to update this password", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Update",
        onPress: () => handleUpdate(),
        style: "destructive",
      },
    ]);
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
            onPress={confirmUpdate}
            className="w-64 bg-mainBlue"
          />
        </View>
      </View>
    </>
  );
};

export default passwordDetail;
