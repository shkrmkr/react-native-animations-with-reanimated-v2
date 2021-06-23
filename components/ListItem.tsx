import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

const SQUARE_SIZE = width * 0.7;

interface Props {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

export const ListItem = ({ title, index, translateX }: Props) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const circleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SQUARE_SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [100, 0, -100],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0 ,0 ,256, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, circleStyle]} />

      <Animated.View style={[styles.titleWrapper, titleStyle]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SQUARE_SIZE,
    width: SQUARE_SIZE,
    backgroundColor: "rgba(0, 0, 256, 0.4)",
  },
  titleWrapper: {
    position: "absolute",
  },
  title: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
