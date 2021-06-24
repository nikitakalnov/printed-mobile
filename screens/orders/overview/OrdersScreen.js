import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import DefaultText from "../../../components/UI/DefaultText";

import { useSelector, useDispatch } from "react-redux";
import { getOrdersWithStatus } from "../../../store/actions/orders";

import Status from "../../../constants/OrderStatuses";
import OrdersList from "../../../components/orders/OrdersList";
import Colors from "../../../constants/Colors";

const OrdersScreen = props => {
  const status = props.status;

  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders[status].list);
  const isLoading = useSelector(state => state.orders[status].isLoading);

  const fetchOrders = () => {
    dispatch(getOrdersWithStatus(Status[status]));
  };

  useEffect(() => {
    props.navigation.setParams({ refreshOrders: fetchOrders });
  }, []);

  useEffect(fetchOrders, []);

  let screenContent = null;
  if (isLoading)
    screenContent = <ActivityIndicator size={46} color={Colors.blue} />;
  else if (orders.length === 0)
    screenContent = (
      <DefaultText style={styles.noOrdersHint}>Нет заказов!</DefaultText>
    );
  else if (orders.length > 0)
    screenContent = (
      <>
        <OrdersList orders={orders} />
        <View style={styles.refreshButtonContainer}>
          <TouchableNativeFeedback onPress={fetchOrders}>
            <FontAwesome5 name="redo-alt" color={Colors.accent} size={22} />
          </TouchableNativeFeedback>
        </View>
      </>
    );

  return <View style={styles.screen}>{screenContent}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noOrdersHint: {
    fontSize: 26
  },
  refreshButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    height: 54,
    width: 54,
    borderRadius: 27,
    position: "absolute",
    bottom: 22,
    right: 22,
    backgroundColor: "#eee"
  }
});

export default OrdersScreen;
