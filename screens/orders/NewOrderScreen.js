import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewOrderScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Place a new order</Text>
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

export default NewOrderScreen;