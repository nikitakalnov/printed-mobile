import React from 'react';
import {Text, Button, ScrollView, Stylesheet, KeyboardAvoidingView, TextInput, View} from 'react-native';

const AuthScreen = props => {
  return (
    <View>
      <Text>Войдите в аккаунт:</Text>
      <Button title="Go to the profile" onPress={() => {
        props.navigation.navigate({routeName: 'Profile'});
      }}/>
    </View>
    
  );
}

export default AuthScreen;