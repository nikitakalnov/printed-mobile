import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const ProfileSetting = props => {
  return (
    <View style={styles.profileSettingContainer}>
      <Text style={styles.profileSetting}>{props.settingName}</Text>
      <View style={styles.valueContainer}>
        {props.renderValue(styles.profileSetting.fontSize)}
        {props.editable && (
          <View style={styles.editButton}>
            <MaterialIcons
              name="edit"
              size={styles.editButton.fontSize}
              color={Colors.blue}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSettingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  profileSetting: {
    fontSize: 16,
    fontFamily: "open-sans-bold"
  },
  valueContainer: {
    flexDirection: "row"
  },
  editButton: {
    marginLeft: 8,
    fontSize: 20
  }
});

export default ProfileSetting;
