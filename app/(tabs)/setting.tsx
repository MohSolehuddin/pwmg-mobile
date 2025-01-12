import { Text } from "react-native";
import SafeAreaShell from "@/components/SafeAreaShell";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "../../src/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";

const Setting = () => {
  interface Row {
    id: number;
    value: string;
    intValue: number;
  }

  interface passwordInterface {
    id: number;
    category: string;
    username: string;
    password: string;
    pin: string;
    delete_at: string;
  }

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [data, setData] = useState<any[]>([]);
  const [password, setPassword] = useState<passwordInterface[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await drizzleDb.query.usersTable.findMany();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        await drizzleDb.insert(schema.password).values({
          category: "test",
          username: "test",
          password: "test",
          pin: "test",
          delete_at: "test",
        });
        console.log("Data inserted password");
      } catch (error) {
        console.log(error);
      }
      const passwordData = await drizzleDb.query.password.findMany();
      setData(data);
      setPassword(passwordData);
    };
    load();
  }, []);

  useEffect(() => {
    console.log("Data", data);
    console.log("Password", password);
  }, [data, password]);

  return (
    <SafeAreaShell>
      <Text className="text-black">{"setting".repeat(10)}</Text>
      {data.length > 0 ? (
        data.map((item) => (
          <Text className="text-white" key={item.id}>
            {item.id} {item.value} {item.intValue}
          </Text>
        ))
      ) : (
        <Text className="text-white">No data available</Text>
      )}
    </SafeAreaShell>
  );
};

export default Setting;
