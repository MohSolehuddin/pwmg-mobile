import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import "../tailwind.css";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const steps = [
    {
      title: "Manage your password",
      description: "With Secure Password Manager",
      image: require("../assets/images/undraw_Mobile_encryption_re_yw3o.png"),
      by: "Moh Solehuddin",
      link: "https://github.com/MohSolehuddin",
    },
    {
      title: "Remember your key",
      description:
        "If your encryption key is lost your previous data cannot be recovered.",
      image: require("../assets/images/undraw_Security_re_a2rk.png"),
    },
    {
      title: "Not connected to any server",
      description:
        "by default this app does not  to any servers your data is entirely yours and your responsibility",
      image: require("../assets/images/undraw_server_down_s4lk.png"),
    },
    {
      title: "Want to access on other devices",
      description:
        "You can go to settings and check the connection to our server.",
      image: require("../assets/images/undraw_Server_re_twwj.png"),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleNavigateToRegister = () => {
    router.replace("/(tabs)");
  };

  return (
    <View className="flex justify-end h-full w-full items-center px-6 py-8 bg-white">
      <Animated.View
        entering={SlideInRight.duration(500)}
        exiting={SlideOutLeft.duration(500)}
        className="flex items-center mb-[30%]">
        <Image
          source={steps[step].image}
          width={300}
          height={300}
          className="bg-black w-[300px] h-[300px] mb-8"
        />
        <Text className="text-2xl font-extrabold text-mainBlue">
          {steps[step].title}
        </Text>
        <Text className="text-base text-center font-medium text-black w-[400px]">
          {steps[step].description}
        </Text>
        {steps[step].link && (
          <Text className="text-xs text-center font-medium text-black">
            <Link
              href={steps[step].link}
              className="text-mainBlue font-extrabold">
              By {steps[step].by}
            </Link>
          </Text>
        )}
      </Animated.View>
      <View className="flex flex-row gap-2 mb-6">
        {steps.map((_, index) => (
          <View
            key={index}
            className={` w-3 h-3 rounded-full ${
              index === step ? "bg-mainBlue" : "bg-gray-300"
            }`}></View>
        ))}
      </View>
      <View className="flex flex-col gap-2 justify-between w-full">
        {step > 0 && (
          <CustomButton onPress={handlePrevious} text={"Previous"} />
        )}
        {step === steps.length - 1 ? (
          <CustomButton
            onPress={handleNavigateToRegister}
            text={"Get Started"}
          />
        ) : (
          <CustomButton onPress={handleNext} text={"Next"} />
        )}
      </View>
    </View>
  );
};

export default Onboarding;
