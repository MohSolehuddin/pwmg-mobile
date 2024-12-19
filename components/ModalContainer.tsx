import { View, Modal } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ModalContainer = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <Modal visible={isOpen} animationType="slide">
      <View className="flex flex-col gap-6 bg-white rounded-3xl p-6">
        <FontAwesome
          name="close"
          size={24}
          color="#9CA3AF"
          className="absolute top-4 right-6 z-50"
          onPress={() => setIsOpen(false)}
        />
        <View className="pt-8">{children}</View>
      </View>
    </Modal>
  );
};

export default ModalContainer;
