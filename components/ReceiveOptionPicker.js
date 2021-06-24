import React from "react";
import { Picker, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Options } from "../constants/ReceiveOption";
import OptionIcons from "../constants/ReceiveOptionIcons";
import Colors from "../constants/Colors";

const ReceiveOptionPicker = props => {
  const receiveOptions = [];
  for (let option in Options) {
    receiveOptions.push(option);
  }

  return (
    <View style={styles.receiveOptionPickerContainer}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={props.option}
          onValueChange={props.onOptionChange}
          mode="dropdown"
        >
          {receiveOptions.map(option => (
            <Picker.Item value={option} label={Options[option].name} key={option} />
          ))}
        </Picker>
      </View>
      <View style={styles.receiveOptionIcon}>
        <FontAwesome5
          name={OptionIcons[props.option]}
          color={Colors.blue}
          size={styles.receiveOptionIcon.fontSize}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  receiveOptionPickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  pickerContainer: {
    flex: 8
  },
  receiveOptionIcon: {
    alignItems: "center",
    flex: 2,
    fontSize: 20
  }
});

export default ReceiveOptionPicker;
