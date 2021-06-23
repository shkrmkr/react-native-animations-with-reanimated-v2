import React, { useState } from "react";
import { Dimensions, StyleSheet, Switch } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const CIRCLE_DIA = Dimensions.get("screen").width * 0.7;

const COLORS = {
  dark: {
    bg: "#1e1e1e",
    circle: "#252525",
    text: "#f8f8f8",
  },
  light: {
    bg: "#f8f8f8",
    circle: "#fff",
    text: "#1e1e1e",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0, 0, 0, 0.1)",
};

export const ColorInterpolationScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const progress = useDerivedValue(
    () => (isDarkMode ? withTiming(1) : withTiming(0)),
    [isDarkMode]
  );

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.bg, COLORS.dark.bg]
    );

    return {
      backgroundColor,
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.circle, COLORS.dark.circle]
    );

    return {
      backgroundColor,
    };
  });

  const rTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.text, COLORS.dark.text]
    ),
  }));

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_DIA,
    height: CIRCLE_DIA,
    borderRadius: CIRCLE_DIA / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  text: {
    fontSize: 70,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 15,
    marginBottom: 50,
  },
});
