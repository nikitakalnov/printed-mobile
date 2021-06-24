import React, { useCallback, useState, useReducer, useEffect } from 'react';
import { Button, StyleSheet, KeyboardAvoidingView, View, ActivityIndicator, Alert } from 'react-native';
import Colors from '../../../constants/Colors';
import Input from '../../../components/UI/Input';
import DefaultText from '../../../components/UI/DefaultText';
import { useDispatch } from 'react-redux';

import { signIn } from '../../../store/actions/auth';
import formReducer, { FORM_INPUT_UPDATE } from '../../../helpers/formReducer';

const AuthScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();

  const showLoginError = () => {
    if(loginError) {
      Alert.alert(
        'Ошибка входа',
        loginError, 
        [{text: 'ОК', onPress: setLoginError.bind(this, null)}]
      );
    }
  };
  
  useEffect(showLoginError, [loginError]);

  const [formState, dispatchFormAction] = useReducer(formReducer, {
    inputValues: {
      phoneNumber: '',
      password: ''
    },
    inputValidities: {
      phoneNumber: undefined,
      password: undefined
    },
    formIsValid: false
  });

  const dispatch = useDispatch();

  const signInHandler = async () => {
    if(formState.formIsValid) {
      setLoading(true);
      try {
        await dispatch(signIn(
          formState.inputValues.phoneNumber,
          formState.inputValues.password
        ));
        props.navigation.navigate('App');
      } catch(e) {
        setLoginError(e.message);
        setLoading(false);
      }
    } else {
      Alert.alert(
        'Некорректные данные',
        'Введите корректный e-mail и пароль и попробуйте заново'
      );
    }
  };

  const inputChangeHandler = useCallback((inputName, inputValue, inputValidity) => {
    dispatchFormAction({
      type: FORM_INPUT_UPDATE,
      input: inputName,
      value: inputValue,
      isValid: inputValidity
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <DefaultText style={styles.title}>Войдите в аккаунт:</DefaultText>
      <View style={styles.inputContainer}>
        <Input 
          phoneNumber 
          id="phoneNumber" 
          label="Номер телефона"
          required
          keyboardType="phone-pad"
          errorText="Введите номер телефона в формате +7xxxxxxxxxx"
          onInputChange={inputChangeHandler}
        />
        <Input 
          id="password" 
          label="Пароль"
          keyboardType="default"
          password
          required
          secureTextEntry
          errorText="Пароль должен состоять из 8 символов и должен содержать хотя бы 1 цифру и 1 заглавную букву"
          onInputChange={inputChangeHandler}
        />
      </View>
      <View>
        {isLoading ? 
          <ActivityIndicator color={Colors.blue} size={26}/> :

          <Button 
            title="Войти" 
            onPress={signInHandler}
            color={Colors.blue}
          />
        }
      </View>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40 
  },
  inputContainer: {
    width: '100%',
    marginVertical: 12
  },
  title: {
    fontSize: 18
  }
});

export default AuthScreen;