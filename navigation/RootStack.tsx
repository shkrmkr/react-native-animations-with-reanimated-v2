import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ColorInterpolation } from "../screens/ColorInterpolation";
import { Home } from "../screens/Home";
import { ScrollInterpolation } from "../screens/ScrollInterpolation";
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
        component={Home}
        options={{ title: "React Native Animations" }}
      />
      <Stack.Screen
        name="ColorInterpolation"
        component={ColorInterpolation}
        options={{ title: "Color Interpolation" }}
      />
      <Stack.Screen
        name="ScrollInterpolation"
        component={ScrollInterpolation}
        options={{ title: "Scroll Interpolation" }}
      />
    </Stack.Navigator>
  );
};
