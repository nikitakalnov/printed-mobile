import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import DefaultText from "../UI/DefaultText";

import Status from "../../constants/OrderStatuses";
import { Options } from "../../constants/ReceiveOption";
import { constructDate } from "../../helpers/date";

import { useDispatch, useSelector } from "react-redux";
import { setOrderDocuments } from "../../store/actions/orders";

import { getEndingForNumber } from "../../helpers/getNumberEnding";

const Order = props => {
  const dispatch = useDispatch();

  const fetchDocumentsInfoForOrder = () => {
    dispatch(setOrderDocuments(props.id));
  };

  const order = useSelector(state =>
    state.orders[props.status].list.find(order => order["id"] === props.id)
  );

  let documentIcons = [];
  let totalDocumentsSheetNumber = 0;
  if (order.documents) {
    for (let i = 1; i <= order.documents.length; i += 1) {
      documentIcons.push(
        <MaterialCommunityIcons
          name="file-document"
          size={30}
          color={Colors.darkBeige}
          key={i}
        />
      );
    }

    totalDocumentsSheetNumber = order.documents.reduce(
      (totalSheets, document) => totalSheets + document.pagesCount,
      0
    );
  }

  let orderStatusTime;

  switch (props.status) {
    case Status.placed:
      orderStatusTime = `Размещён ${constructDate(props.createdAt)}`;
      break;
    case Status.inwork:
      orderStatusTime = `Размещён ${constructDate(props.createdAt)}`;
      break;
    case Status.ready:
      orderStatusTime = `Выполнен ${constructDate(props.doneAt)}`;
      break;
    case Status.received:
      orderStatusTime = `Был получен ${constructDate(props.receivedAt)}`;
      break;
    default:
      orderStatusTime = constructDate(props.createdAt);
  }

  useEffect(fetchDocumentsInfoForOrder, [dispatch, props.id]);

  return (
    <View style={styles.orderContainer}>
      <DefaultText style={styles.orderDate}>{orderStatusTime}</DefaultText>
      <View style={styles.documentsPriceContainer}>
        <View style={styles.documentsListContainer}>{documentIcons}</View>
        <View style={styles.accountValue}>
          <Text style={styles.orderPrice}>{props.cost}</Text>
          <FontAwesome5 name="ruble-sign" size={styles.orderPrice.fontSize} />
        </View>
      </View>
      <DefaultText>{`Всего ${totalDocumentsSheetNumber} лист${getEndingForNumber(
        totalDocumentsSheetNumber
      )}`}</DefaultText>
      <DefaultText>{`Способ получения: ${
        Options[props.receiveOption].name
      }`}</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2
  },
  orderDate: {
    color: Colors.primary
  },
  documentsPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4
  },
  documentsListContainer: {
    flexDirection: "row"
  },
  orderPrice: {
    fontSize: 26,
    color: Colors.blue,
    marginRight: 4,
    fontFamily: "open-sans-bold"
  },
  accountValue: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default Order;
