import AddNewPassword from "@/components/AddNewPassword";
import ModalContainer from "@/components/ModalContainer";
import PasswordCard from "@/components/PasswordCard";
import CustomPieChart from "@/components/PieChart";
import SafeAreaShell from "@/components/SafeAreaShell";
import SearchInput from "@/components/SearchInput";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as schema from "../../src/db/schema";
import passwordInterface from "@/src/interfaces/passwordInterfaces";
export default function HomeScreen() {
  const [isAddPasswordModalOpen, setIsAddPasswordModalOpen] = useState(false);
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const passwords = useLiveQuery(drizzleDb.query.password.findMany());
  const [pieData, setPieData] = useState<any[]>([
    {
      value: 0,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
      label: "Strong",
    },
    {
      value: 0,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
      label: "Good",
    },
    {
      value: 0,
      color: "#FFE31A",
      gradientCenterColor: "#FFE31E",
      label: "Fair",
    },
    {
      value: 0,
      color: "#F44336",
      gradientCenterColor: "##F44336",
      label: "Weak",
    },
  ]);

  const dataPassword = passwords.data.map((item: passwordInterface | null) => {
    if (item === null || item.password === null) return null;
    return {
      id: item.id,
      title: item.category,
      password: item.password,
      strength:
        item.password.length > 12
          ? "Strong"
          : item.password.length > 8
          ? "Good"
          : item.password.length > 6
          ? "Fair"
          : "Weak",
    };
  });

  useEffect(() => {
    setPieData(
      pieData.map((item) => {
        return {
          ...item,
          value: dataPassword.filter(
            (password) => password?.strength === item.label
          ).length,
        };
      })
    );
  }, [passwords.data]);

  const handleAddPassword = () => {
    setIsAddPasswordModalOpen(true);
  };

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
              title={item.title || ""}
              password={item.password || ""}
              strength={item.strength || ""}
              key={index}
              id={item.id.toString() || ""}
            />
          ))}
        </View>
      </SafeAreaShell>
      <MaterialIcons
        name="add"
        size={40}
        color="#232B5D"
        className="absolute bottom-6 right-10 bg-white rounded-full"
        onPress={handleAddPassword}
      />
    </View>
  );
}
