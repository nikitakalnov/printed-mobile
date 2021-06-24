import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';

import { authenticate } from '../store/actions/auth';
import { SET_BASIC_USER_DATA } from '../store/actions/user';
import { useDispatch } from 'react-redux';

const StartupScreen = props => {
  const dispatch = useDispatch();

  const tryAutoLogin = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if(!userData) {
      props.navigation.navigate('Auth');
    } 
    else {
      const userDataObject = JSON.parse(userData);
      const { token, id, expiryDate, name, email, phoneNumber } = userDataObject;
      const expirationDate = new Date(expiryDate);

      if(expirationDate <= new Date() || !token || !id) {
        props.navigation.navigate('Auth');
      }
      else {
        const expirationTime = expirationDate.getTime() - new Date().getTime();

        dispatch(authenticate(token, id, expirationTime));
        dispatch({
          type: SET_BASIC_USER_DATA,
          userName: name,
          email: email,
          phoneNumber: phoneNumber
        });
        props.navigation.navigate('App');
      }
    }
  };

  useEffect(() => {
    tryAutoLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={46} color={Colors.blue}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;