import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import DefaultText from "../../components/UI/DefaultText";
import ProfileSetting from "../../components/profile/ProfileSetting";

import Colors from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { setAccountBalance } from "../../store/actions/user";
import { logout } from "../../store/actions/auth";

const ProfileScreen = props => {
  const dispatch = useDispatch();

  const fetchAndSaveAccountBalance = () => {
    dispatch(setAccountBalance());
  };

  useEffect(fetchAndSaveAccountBalance, []);

  const userData = useSelector(state => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const renderAccountValue = textSize => {
    return (
      <View style={styles.accountValue}>
        {typeof userData.accountBalance === "number" ? (
          <>
            <Text
              style={{
                fontSize: textSize,
                marginRight: 4,
                fontFamily: "open-sans-bold"
              }}
            >
              {userData.accountBalance}
            </Text>
            <FontAwesome5 name="ruble-sign" size={textSize} />
          </>
        ) : (
          <ActivityIndicator color={Colors.blue} size={18} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.userInfo}>
        <Text style={styles.title}>Мой аккаунт</Text>
        <View style={styles.section}>
          <Ionicons
            name="md-person"
            size={100}
            color={Colors.accent}
            style={styles.userIcon}
          />
          <Text style={styles.userName}>{userData.userName}</Text>
        </View>
        <View
          style={{
            ...styles.section,
            paddingTop: 26
          }}
        >
          <ProfileSetting
            renderValue={renderAccountValue}
            settingName="Баланс счёта"
          />
          <ProfileSetting
            settingName="Номер телефона"
            renderValue={textSize => (
              <DefaultText style={{ fontSize: textSize }}>
                {userData.phoneNumber}
              </DefaultText>
            )}
            editable
          />
          <ProfileSetting
            settingName="E-mail"
            renderValue={textSize => (
              <DefaultText style={{ fontSize: textSize }}>
                {userData.email}
              </DefaultText>
            )}
            editable
          />
        </View>
      </View>
      <Button title="Выйти" color={Colors.blue} onPress={logoutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40
  },
  title: {
    fontSize: 30,
    fontFamily: "open-sans-bold",
    marginBottom: 18
  },
  userName: {
    fontSize: 22,
    fontFamily: "open-sans-bold"
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // borderBottomColor: Colors.blue,
    // borderBottomWidth: 2,
    paddingBottom: 12
  },
  userIcon: {
    marginVertical: 4
  },
  accountValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default ProfileScreen;
