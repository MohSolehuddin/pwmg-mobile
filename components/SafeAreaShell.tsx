import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";

interface SafeAreaShellProps {
  children: React.ReactNode;
  isScrollView?: boolean;
  backGroundColor?: string;
  styleStatusBar?: string;
}
const SafeAreaShell = ({
  children,
  isScrollView = true,
  backGroundColor = "bg-grey",
  styleStatusBar = "dark",
}: SafeAreaShellProps) => {
  return (
    <SafeAreaView className={`pt-4 bg-${backGroundColor} h-full`}>
      <StatusBar style={styleStatusBar as any} />
      {isScrollView ? (
        <Animated.ScrollView className="px-6">{children}</Animated.ScrollView>
      ) : (
        <Animated.View className="px-6 pt-4">{children}</Animated.View>
      )}
    </SafeAreaView>
  );
};

export default SafeAreaShell;
``;
