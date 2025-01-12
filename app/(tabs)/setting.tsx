import { Text } from "react-native";
import SafeAreaShell from "@/components/SafeAreaShell";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "../../src/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import passwordInterface from "@/src/interfaces/passwordInterfaces";

const Setting = () => {
  interface Row {
    id: number;
    value: string;
    intValue: number;
  }

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [data, setData] = useState<any[]>([]);
  const passwords = useLiveQuery(drizzleDb.query.password.findMany());

  useEffect(() => {
    console.log("Data", data);
    console.log("Password", passwords);
  }, [data, passwords]);

  return (
    <SafeAreaShell>
      <Text className="text-black">{"setting".repeat(10)}</Text>
      {passwords.data.length > 0 ? (
        passwords.data.map((item: passwordInterface) => (
          <Text className="text-black" key={item.id}>
            id: {item.id} category: {item.category} username: {item.username}{" "}
            email: {item.email} password: {item.password} {item.pin}
          </Text>
        ))
      ) : (
        <Text className="text-black text-center">No data available</Text>
      )}
    </SafeAreaShell>
  );
};

export default Setting;
