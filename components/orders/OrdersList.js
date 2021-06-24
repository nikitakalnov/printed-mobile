import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import moment from 'moment';

import Order from './Order';

const OrdersList = props => {
  const renderOrder = ({ item }) => {
    return (<Order
      id={item["id"]}
      cost={item["cost"]}
      status={item["status"]}
      receiveOption={item["receiveOption"]}
      createdAt={item["createdAt"]}
      receivedAt={item["receivedAt"]}
      doneAt={item["doneAt"]}
      totalSheets={item.totalSheets}
    />);
  };

  return(
    <View style={styles.list}>
      <FlatList 
        data={props.orders.sort((a, b) => moment(b.createdAt) - moment(a.createdAt))}
        renderItem={renderOrder}
        keyExtractor={item => `document${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%'
  }
});

export default OrdersList;