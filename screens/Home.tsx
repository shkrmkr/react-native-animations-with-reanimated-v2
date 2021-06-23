import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeScreenNavigationProp } from "../navigation/type";

export const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navMenu}
        onPress={() => {
          navigation.navigate("ColorInterpolation");
        }}
      >
        <Text style={styles.navMenuText}>Color Interpolation</Text>
        <Ionicons name="arrow-forward-circle-outline" size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navMenu}
        onPress={() => {
          navigation.navigate("ScrollInterpolation");
        }}
      >
        <Text style={styles.navMenuText}>Scroll Interpolation</Text>
        <Ionicons name="arrow-forward-circle-outline" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navMenu: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  navMenuText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
});
