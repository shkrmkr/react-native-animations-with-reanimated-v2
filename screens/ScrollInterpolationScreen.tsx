import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { ListItem } from "../components/ListItem";

const DATA = ["hello", "react", "native", "world", "😄"];

export const ScrollInterpolationScreen = () => {
  const translateX = useSharedValue(0);

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      onScroll={(e) => {
        translateX.value = e.nativeEvent.contentOffset.x;
      }}
      scrollEventThrottle={16}
    >
      {DATA.map((title, index) => (
        <ListItem
          key={index}
          title={title}
          index={index}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
};
