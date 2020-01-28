import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentsScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Check all the uploaded documents</Text>
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

export default DocumentsScreen;