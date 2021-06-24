import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Button,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert
} from "react-native";

import { withNavigationFocus } from "react-navigation";

import Colors from "../../../constants/Colors";

import ReceiveOptionPicker from "../../../components/ReceiveOptionPicker";

import LocationPicker from "../../../components/LocationPicker";
import DocumentPicker from "../../../components/documents/DocumentPicker";
import { useSelector, useDispatch } from "react-redux";
import { clearDocuments } from "../../../store/actions/documents";
import { Options } from '../../../constants/ReceiveOption';

const ORDER_CREATION_URL = "https://printed-server.herokuapp.com/orders/new";
const DOCUMENT_UPLOAD_URL = "https://printed-server.herokuapp.com/documents";

const DEFAULT_RECEIVE_OPTION = Options.university.key

const createOrderUrl = orderId =>
  `https://printed-server.herokuapp.com/orders/${orderId}`;

const NewOrderScreen = props => {
  const dispatch = useDispatch();

  const [orderId, setOrderId] = useState();
  const [isSubmitting, setSubmitting] = useState(false);
  const [receiveOption, setReceiveOption] = useState(DEFAULT_RECEIVE_OPTION);
  const [userLocation, setUserLocation] = useState([]);

  const authToken = useSelector(state => state.auth.token);
  const orderDocuments = useSelector(state => state.documents.documents);

  const uploadDocumentToServer = async (documentInfo, newOrderId) => {
    const formData = new FormData();
    formData.append("document", {
      uri: documentInfo.uri,
      type: documentInfo.type,
      name: documentInfo.name
    });
    formData.append("orderId", newOrderId);

    await fetch(DOCUMENT_UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: authToken,
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

  const receiveOptionChangeHandler = useCallback(value => {
    setReceiveOption(value);
  });

  const uploadDocuments = async (orderId) => {
    for (let i = 0; i < orderDocuments.length; i += 1) {
      await uploadDocumentToServer(orderDocuments[i], orderId);
      console.log(`Documents ${orderDocuments[i].name} was uploaded`);
    }
  };

  const placeOrderHandler = async () => {
    if (receiveOption === undefined)
      Alert.alert(
        "Не удалось разместить заказ",
        "Заполните параметры вашего заказа"
      );
    else {
      setSubmitting(true);

      const orderCreationResponse = await fetch(ORDER_CREATION_URL, {
        method: "POST",
        headers: {
          Authorization: authToken
        }
      });

      // Создание пустого заказа
      const newOrderId = await orderCreationResponse.text();

      // Загрузка документов на сервер
      await uploadDocuments(newOrderId);

      // Добавление данных о заказе
      await fetch(createOrderUrl(newOrderId), {
        method: "PUT",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          location: userLocation,
          radius: 100,
          receiveOption: receiveOption
        })
      });

      setSubmitting(false);
      clearOrderCreatingState();
      props.navigation.navigate("PlacementInfo");
    }
  };

  
  const clearOrderCreatingState = useCallback(() => {
    setReceiveOption(DEFAULT_RECEIVE_OPTION);
    dispatch(clearDocuments());
  }, []);

  const cancelOrderPlacementHandler = async () => {
    clearOrderCreatingState();
    props.navigation.navigate("Profile");
  };

  return props.isFocused ? (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.orderDetails}>
        <View style={styles.receiveOptionDetails}>
          <Text style={styles.subtitle}>Cпособ получения распечатки:</Text>
          <ReceiveOptionPicker
            onOptionChange={receiveOptionChangeHandler}
            option={receiveOption}
          />
        </View>
        {receiveOption === Options.personal.key && <LocationPicker setLocation={setUserLocation} />}
        <DocumentPicker />
      </View>
      <View style={styles.orderSubmitButtonContainer}>
        <View style={styles.creationControlButton}>
          {isSubmitting ? (
            <ActivityIndicator size={24} color={Colors.blue} />
          ) : (
            <Button
              title="Разместить заказ"
              color={Colors.accent}
              onPress={placeOrderHandler}
            />
          )}
        </View>
      </View>
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingVertical: 24,
    alignItems: "center",
    paddingHorizontal: 26,
    justifyContent: "space-between"
  },
  orderDetails: {
    width: "100%"
  },
  subtitle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginBottom: 6
  },
  receiveOptionDetails: {
    marginVertical: 14
  },
  orderSubmitButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 14
  },
  creationControlButton: {
    width: 220
  },
  centeredContentContainer: {
    alignItems: "center"
  }
});

export default withNavigationFocus(NewOrderScreen);
