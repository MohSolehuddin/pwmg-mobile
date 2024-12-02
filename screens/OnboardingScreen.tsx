import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Welcome", description: "Welcome to our app!" },
    { title: "Feature 1", description: "Explore our awesome features." },
    { title: "Feature 2", description: "Stay connected anytime." },
    { title: "Get Started", description: "Let's get started!" },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={SlideInRight.duration(500)}
        exiting={SlideOutLeft.duration(500)}
        style={styles.content}>
        <Text style={styles.title}>{steps[step].title}</Text>
        <Text style={styles.description}>{steps[step].description}</Text>
      </Animated.View>
      <View style={styles.navigation}>
        {step > 0 && <Button title="Previous" onPress={handlePrevious} />}
        <Button
          title={step === steps.length - 1 ? "Finish" : "Next"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default OnboardingScreen;
