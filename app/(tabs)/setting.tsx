import { Text } from "react-native";
import SafeAreaShell from "@/components/SafeAreaShell";
import { useState } from "react";
// import * as SQLite from "expo-sqlite";

const setting = () => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   // const getData = async () => {
  //   //   const db = await SQLite.openDatabaseAsync("databaseName");
  //   //   const result = await db.getAllAsync("SELECT * FROM test");
  //   // };

  //   // const db = DatabaseManager.getInstance();
  //   const getData = async () => {
  //     const result = await db.getData(["id", "value", "intValue"], "test");
  //     setData(result);
  //   };
  //   getData();
  // }, []);
  return (
    <SafeAreaShell>
      <Text className="text-white">{"setting".repeat(10)}</Text>
      {data.map((item) => (
        <Text className="text-white" key={item.id}>
          {item.id} {item.value} {item.intValue}
        </Text>
      ))}
    </SafeAreaShell>
  );
};

export default setting;
