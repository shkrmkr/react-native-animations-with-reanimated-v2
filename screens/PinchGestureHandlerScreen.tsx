import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const imageUri =
  "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const PinchGestureHandlerScreen = () => {
  const [center, setCenter] = useState({
    x: 0,
    y: 0,
  });
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -center.x },
        { translateY: -center.y },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: center.x },
        { translateY: center.y },
      ],
    };
  });

  const rFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setCenter({ x: width / 2, y: height / 2 });
        }}
        style={{ flex: 1 }}
      >
        <AnimatedImage
          style={[{ flex: 1 }, rImageStyle]}
          source={{
            uri: imageUri,
          }}
        />
        <Animated.View style={[styles.focalPoint, rFocalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: "rgba(0,0,0,.5)",
    borderRadius: 20,
  },
});
