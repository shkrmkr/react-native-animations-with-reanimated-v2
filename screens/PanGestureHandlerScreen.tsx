import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type GestureHandlerContext = {
  translateX: number;
  translateY: number;
};

const BOUNDARY_SIZE = Dimensions.get("screen").width - 30;
const CIRCLE_DIAMETER = 100;

export const PanGestureHandlerScreen = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distanceMoved = Math.sqrt(
        translateX.value ** 2 + translateY.value ** 2
      );

      if (distanceMoved < BOUNDARY_SIZE / 2 + CIRCLE_DIAMETER / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.disc}>
        내부의 원이 경계 밖으로 완전히 나가면 원래의 자리로 되돌아 가지
        않습니다.
      </Text>
      <View style={styles.boundary}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.circle, rStyle]}>
            <View style={styles.centerPoint} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER,
    backgroundColor: "rgba(0, 0, 256, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centerPoint: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  boundary: {
    width: BOUNDARY_SIZE,
    height: BOUNDARY_SIZE,
    borderRadius: BOUNDARY_SIZE,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 256, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  disc: {
    position: "absolute",
    top: 40,
    fontSize: 17,
    paddingHorizontal: 20,
  },
});
