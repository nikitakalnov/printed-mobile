import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = props => {
  const textStyle = {...props.style, ...styles.text};
  return <Text {...props} style={textStyle} >{props.children}</Text>
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  }
});

export default DefaultText;