import React from 'react';
import {Text, Button, ScrollView, StyleSheet, KeyboardAvoidingView, TextInput, View} from 'react-native';
import Colors from '../../constants/Colors';

const credentials = {
  phoneNumber: "+78005553535",
  password: "myPassword"
};

const AuthScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Войдите в аккаунт:</Text>
      <Button title="Go to the profile" onPress={() => {
        props.navigation.navigate({routeName: 'Profile', params: {
          credentials: credentials
        }});
      }}/>
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

export default AuthScreen;