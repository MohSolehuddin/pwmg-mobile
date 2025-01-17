import { FontAwesome } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { TextInput, View } from "react-native";
import ModalContainer from "./ModalContainer";
import { Text } from "react-native";
import CustomButton from "./CustomButton";

const SearchInput = ({ ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TextInput
        placeholder="Search"
        {...props}
        className="bg-gray-100 rounded-3xl pl-16 px-6 py-4 w-full mb-6"
      />
      <MaterialIcons
        name="search"
        size={24}
        color="#9CA3AF"
        className="absolute top-4 left-6"
      />
      <FontAwesome
        name="filter"
        size={24}
        color="#9CA3AF"
        className="absolute top-4 right-6"
        onPress={() => setModalVisible(true)}
      />
      <ModalContainer
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
        children={
          <View className="flex gap-6">
            <Text>Filter</Text>
            <CustomButton onPress={() => setModalVisible(false)} text="Apply" />
          </View>
        }
      />
    </View>
  );
};

export default SearchInput;
