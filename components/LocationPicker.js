import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import DefaultText from "./UI/DefaultText";
import Colors from "../constants/Colors";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { MaterialIcons } from "@expo/vector-icons";

const createTomTomApiQueryPath = (latitude, longitude) => {
  return `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.JSON?key=TkVGGSOP9OzIonoPoZ8G4dc6hshbHSov`;
};

const LocationPicker = props => {
  const [isFetching, setFetching] = useState(false);
  const [userAddress, setUserAddress] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Недостаточно прав",
        "Предоставьте разрешение на получение геолокации."
      );
      return false;
    }
    return true;
  };

  const fetchAddress = async (latitude, longitude) => {
    const apiPath = createTomTomApiQueryPath(latitude, longitude);

    const addressResponse = await fetch(apiPath, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Printed"
      }
    });

    const result = await addressResponse.json();
    setUserAddress(result.addresses[0].address.freeformAddress);
  };

  const getLocationHandler = async () => {
    const havePermission = await verifyPermissions();
    if (havePermission) {
      try {
        setFetching(true);
        const userLocation = await Location.getCurrentPositionAsync({
          timeout: 5000,
          enableHighAccuracy: true
        });
        props.setLocation([
          userLocation.coords.latitude,
          userLocation.coords.longitude
        ]);

        await fetchAddress(
          userLocation.coords.latitude,
          userLocation.coords.longitude
        );
      } catch (error) {
        console.log(error)
        Alert.alert(
          "Невозможно получить геоданные",
          "Удостоверьтесь, что у вас включена передача геоданных и отключен режим полёта"
        );
      }
      setFetching(false);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.locationTitleWithPickerContainer}>
        <Text style={styles.locationTitle}>Местоположение: </Text>
        <TouchableWithoutFeedback
          onPress={getLocationHandler}
          style={styles.locationIconContainer}
        >
          {userAddress === undefined ? (
            <MaterialIcons
              name="location-on"
              size={32}
              color={Colors.primary}
            />
          ) : (
            <MaterialIcons
              name="edit-location"
              size={32}
              color={Colors.darkBeige}
            />
          )}
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.address}>
        {isFetching ? (
          <ActivityIndicator size={30} color={Colors.blue} />
        ) : userAddress === undefined ? (
          <DefaultText>Местоположение не выбрано</DefaultText>
        ) : (
          <DefaultText>{`Ваше местоположение: ${userAddress}`}</DefaultText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  address: {
    marginBottom: 20,
    width: "100%"
  },
  locationPicker: {
    paddingVertical: 10
  },
  locationTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginBottom: 16,
    marginRight: 4
  },
  locationTitleWithPickerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline"
  },
  locationIconContainer: {}
});

export default LocationPicker;
