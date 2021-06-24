import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  ScrollInterpolation: undefined;
  ColorInterpolation: undefined;
  PanGestureHandler: undefined;
  PinchGestureHandler: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
