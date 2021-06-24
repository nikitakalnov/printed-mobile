import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, View, ScrollView, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Input from '../../../components/UI/Input';
import DefaultText from '../../../components/UI/DefaultText';

import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/actions/auth';

import { FORM_INPUT_UPDATE } from '../../../helpers/formReducer';
import formReducer from '../../../helpers/formReducer';
import Colors from '../../../constants/Colors';

const SignUpScreen = props => {

  const [isLoading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState();
  
  const [formState, dispatchFormAction] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      name: '',
      cardNumber: '',
      phoneNumber: ''
    },
    inputValidities: {
      email: undefined,
      password: undefined,
      name: undefined,
      cardNumber: undefined,
      phoneNumber: undefined
    },
    formIsValid: false
  });

  const showSignUpError = () => {
    if(signUpError) {
      Alert.alert(
        'Ошибка регистрации',
        signUpError,
        [{text: 'OK', onPress: setSignUpError.bind(this, null)}]
      );
    }
  }

  useEffect(showSignUpError, signUpError);

  const dispatch = useDispatch();

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormAction({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormAction]);

  const signUpHandler = useCallback(async () => {
    if(formState.formIsValid) {
      setLoading(true);
      try {
        await dispatch(signUp(
          formState.inputValues.name,
          formState.inputValues.phoneNumber,
          formState.inputValues.email,
          formState.inputValues.password,
          formState.inputValues.cardNumber
        ));
        
        props.navigation.navigate('SignIn');

      } catch(e) {
        setSignUpError(e.message);
      }
      setLoading(false);
    } else {
      Alert.alert(
        'Некорректные данные',
        'Исправьте ошибки во введённых данных и попробуйте заново'
      );
    }
    
  }, [formState]);

  const ONE_ERROR_MESSAGE_OFFSET = 25;
  let overallKeyboardOffset = 0;
  const validities = formState.inputValidities;
  for(let input in validities) {
    if(validities[input] == false)
      overallKeyboardOffset -= ONE_ERROR_MESSAGE_OFFSET;
  }

  return(
    <ScrollView contentContainerStyle={styles.screen}>
      <KeyboardAvoidingView style={styles.form} behavior="position" keyboardVerticalOffset={overallKeyboardOffset}>
        <DefaultText style={styles.title}>Зарегистрироваться:</DefaultText>
        <Input
          id="name"
          label="Имя"
          required
          errorText="Введите своё имя"
          onInputChange={inputChangeHandler}
        />

        <Input
          id="phoneNumber"
          label="Номер телефона"
          required
          phoneNumber
          keyboardType="phone-pad"
          errorText="Введите номер телефона в формате +7xxxxxxxxxx"
          onInputChange={inputChangeHandler}
        />  

        <Input
          id="email"
          label="E-mail"
          required
          email
          keyboardType="email-address"
          errorText="Введите корректный e-mail адрес"
          onInputChange={inputChangeHandler}
        />

        <Input
          id="password"
          label="Пароль"
          password
          required
          errorText="Пароль должен состоять из 8 символов и должен содержать хотя бы 1 цифру и 1 заглавную букву"
          onInputChange={inputChangeHandler}
        />

        <Input
          id="cardNumber"
          label="Номер карты"
          required
          cardNumber
          keyboardType="numeric"
          errorText="Введите корректный номер банковской карты"
          onInputChange={inputChangeHandler}
        />

        <View style={styles.formControlsContainer}>
          <Button title="Зарегистрироваться" onPress={ signUpHandler } color={Colors.blue} />
        </View>

      </KeyboardAvoidingView>

      <View style={styles.loginHintContainer}>
        <DefaultText style={styles.loginHint}>{'Уже зарегистрированы?\nВойдите в аккаунт:'}</DefaultText> 
        <View style={{marginTop: 16}}>
          <Button 
            title="Войти в аккаунт" 
            color={Colors.primary}
            onPress={() => {props.navigation.navigate('SignIn') }}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  form: {
    flex: 1,
    width: '100%',
    marginVertical: 20
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  formControlsContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  loginHintContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginHint: {
    color: '#777',
    textAlign: 'center'
  }
});

export default SignUpScreen;