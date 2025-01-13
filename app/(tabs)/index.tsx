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
import { desc } from "drizzle-orm";

export default function HomeScreen() {
  const [isAddPasswordModalOpen, setIsAddPasswordModalOpen] = useState(false);
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [page, setPage] = useState(1);
  const limit = 10;
  const passwords = useLiveQuery(
    drizzleDb
      .select()
      .from(schema.password)
      .limit(limit)
      .offset(limit * (page - 1))
      .orderBy(desc(schema.password.id))
  );

  const [isPagingLimit, setIsPagingLimit] = useState(false);

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
      gradientCenterColor: "#F44336",
      label: "Weak",
    },
  ]);

  const dataPassword = passwords?.data
    .map((item: passwordInterface | null) => {
      if (!item || !item.password) return null;
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
    })
    .filter((item) => item !== null);

  useEffect(() => {
    if (!dataPassword) return;

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

  const loadMore = async () => {
    try {
      let loadMoreData = await drizzleDb
        .select()
        .from(schema.password)
        .limit(limit)
        .offset(limit * page)
        .orderBy(desc(schema.password.id));
      console.log("Load more", loadMoreData);
      passwords.data.push(...loadMoreData);
      if (loadMoreData.length < limit) setIsPagingLimit(true);
      setPage(page + 1);
    } catch (error) {
      console.log("Error nih", error);
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isPagingLimit) return;
    if (isAtBottom) {
      loadMore();
    }
  };

  return (
    <View>
      <SafeAreaShell
        backGroundColor={"mainBlue"}
        styleStatusBar="light"
        handleScroll={handleScroll}>
        <CustomPieChart data={pieData} />
        <View className="flex gap-6 mb-24">
          <SearchInput />
          <ModalContainer
            isOpen={isAddPasswordModalOpen}
            setIsOpen={setIsAddPasswordModalOpen}>
            <AddNewPassword />
          </ModalContainer>
          {dataPassword.map((item) => (
            <PasswordCard
              title={item.title || ""}
              password={item.password || ""}
              strength={item.strength || ""}
              key={item.id.toString()}
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
