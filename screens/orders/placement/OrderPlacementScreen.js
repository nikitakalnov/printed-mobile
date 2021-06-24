import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import DefaultText from "../../../components/UI/DefaultText";

const OrderPlacementScreen = props => {
  return (
    <View style={styles.screen}>
      <DefaultText style={styles.message}>Заказ успешно размещён!</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    fontSize: 26,
    color: Colors.accent,
    textAlign: "center"
  }
});

export default OrderPlacementScreen;
