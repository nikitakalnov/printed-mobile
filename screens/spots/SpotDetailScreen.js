import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpotDetailScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Check spot details</Text>
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

export default SpotDetailScreen;