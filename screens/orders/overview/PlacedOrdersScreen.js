import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlacedOrdersScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Placed orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PlacedOrdersScreen;