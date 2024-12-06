import { FontAwesome } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Modal, TextInput, View } from "react-native";

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
      <Modal visible={modalVisible} animationType="slide">
        <View className="bg-white rounded-3xl p-6">
          <FontAwesome
            name="close"
            size={24}
            color="#9CA3AF"
            className="absolute top-4 right-6"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default SearchInput;
