import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ColorInterpolationScreen } from "../screens/ColorInterpolationScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { PanGestureHandlerScreen } from "../screens/PanGestureHandlerScreen";
import { PinchGestureHandlerScreen } from "../screens/PinchGestureHandlerScreen";
import { ScrollInterpolationScreen } from "../screens/ScrollInterpolationScreen";
import { RootStackParamList } from "./type";

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: (props) => {
          if (props.canGoBack) {
            return (
              <Ionicons
                name="arrow-back"
                size={30}
                style={{ marginLeft: 10 }}
                onPress={props.onPress}
              />
            );
          }
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "React Native Animations" }}
      />
      <Stack.Screen
        name="ColorInterpolation"
        component={ColorInterpolationScreen}
        options={{ title: "Color Interpolation" }}
      />
      <Stack.Screen
        name="ScrollInterpolation"
        component={ScrollInterpolationScreen}
        options={{ title: "Scroll Interpolation" }}
      />
      <Stack.Screen
        name="PanGestureHandler"
        component={PanGestureHandlerScreen}
      />
      <Stack.Screen
        name="PinchGestureHandler"
        component={PinchGestureHandlerScreen}
      />
    </Stack.Navigator>
  );
};
