import { Text } from "react-native";
import SafeAreaShell from "@/components/SafeAreaShell";
import { useEffect, useState } from "react";
import { DatabaseManager } from "@/utils/db";
// import * as SQLite from "expo-sqlite";

const setting = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // const getData = async () => {
    //   const db = await SQLite.openDatabaseAsync("databaseName");
    //   const result = await db.getAllAsync("SELECT * FROM test");

    const db = DatabaseManager.getInstance();
    const getData = async () => {
      const result = await db.getData(
        ["id", "value", "intValue"],
        "test",
        "id = 15"
      );
      setData(result);
    };
    getData();
  }, []);
  return (
    <SafeAreaShell>
      <Text className="">{"setting".repeat(10)}</Text>
      {data.map((item) => (
        <Text key={item.id}>
          {item.id} {item.value} {item.intValue}
        </Text>
      ))}
    </SafeAreaShell>
  );
};

export default setting;
