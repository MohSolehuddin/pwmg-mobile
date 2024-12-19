import AddNewPassword from "@/components/AddNewPassword";
import ModalContainer from "@/components/ModalContainer";
import PasswordCard from "@/components/PasswordCard";
import CustomPieChart from "@/components/PieChart";
import SafeAreaShell from "@/components/SafeAreaShell";
import SearchInput from "@/components/SearchInput";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [isAddPasswordModalOpen, setIsAddPasswordModalOpen] = useState(false);
  const pieData = [
    {
      value: 305,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
      label: "Strong",
    },
    {
      value: 90,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
      label: "Good",
    },
    {
      value: 40,
      color: "#FFE31A",
      gradientCenterColor: "#FFE31E",
      label: "Fair",
    },
    {
      value: 30,

      color: "#F44336",
      gradientCenterColor: "##F44336",
      label: "Weak",
    },
  ];
  const dataPassword = [
    {
      id: 1,
      title: "Password 1",
      password: "password1",
      strength: "Strong",
    },
    {
      id: 2,
      title: "Password 2",
      password: "password2",
      strength: "Good",
    },
    {
      id: 3,
      title: "Password 3",
      password: "password3",
      strength: "Fair",
    },
    {
      id: 4,
      title: "Password 4",
      password: "password4",
      strength: "Weak",
    },
    {
      id: 5,
      title: "Password 5",
      password: "password5",
      strength: "Weak",
    },
    {
      id: 6,
      title: "Password 6",
      password: "password6",
      strength: "Weak",
    },
    {
      id: 7,
      title: "Password 7",
      password: "password7",
      strength: "Weak",
    },
    {
      id: 8,
      title: "Password 8",
      password: "password8",
      strength: "Weak",
    },
    {
      id: 9,
      title: "Password 9",
      password: "password9",
      strength: "Weak",
    },
    {
      id: 10,
      title: "Password 10",
      password: "password10",
      strength: "Weak",
    },
  ];

  return (
    <View>
      <SafeAreaShell backGroundColor={"mainBlue"} styleStatusBar="light">
        <CustomPieChart data={pieData} />
        <View className="flex gap-6 mb-24">
          <SearchInput />
          <ModalContainer
            isOpen={isAddPasswordModalOpen}
            setIsOpen={setIsAddPasswordModalOpen}>
            <AddNewPassword />
          </ModalContainer>
          {dataPassword.map((item, index) => (
            <PasswordCard
              title={item.title}
              password={item.password}
              strength={item.strength}
              key={index}
              id={item.id}
            />
          ))}
        </View>
      </SafeAreaShell>
      <MaterialIcons
        name="add"
        size={40}
        color="#232B5D"
        className="absolute bottom-6 right-10 bg-white rounded-full"
        onPress={() => setIsAddPasswordModalOpen(true)}
      />
    </View>
  );
}
