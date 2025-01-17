import OnboardingScreen from "@/app/onboarding";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../src/db/schema";
import LoginScreen from "@/screens/auth/LoginScreen";

export default function Onboarding() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [isFirstTimeState, setIsFirstTimeState] = useState(false);

  const getIsFirstTime = async () => {
    try {
      const result = await drizzleDb.select().from(schema.isFirstTime);
      if (!result[0]) {
        await drizzleDb
          .insert(schema.isFirstTime)
          .values({ isFirstTime: "false" });
        setIsFirstTimeState(true);
        return;
      }
      setIsFirstTimeState(false);
    } catch (error) {
      console.error("error", error);
      setIsFirstTimeState(false);
    }
  };

  useEffect(() => {
    getIsFirstTime();
  }, []);

  if (isFirstTimeState) {
    return <OnboardingScreen />;
  }
  return <LoginScreen />;
}
