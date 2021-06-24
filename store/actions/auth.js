export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

import { SET_BASIC_USER_DATA } from './user';
import { AsyncStorage } from 'react-native';

let timer;

const saveAuthDataToStorage = (token, userId, userName, email, phoneNumber, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    id: userId,
    expiryDate: expirationDate.toISOString(),
    name: userName,
    email: email,
    phoneNumber: phoneNumber
  }));
};

const clearLogoutTimer = () => {
  if(timer)
    clearTimeout(timer);
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authenticate = (token, userId, expirationTime) => {
  return dispatch => {
    // dispatch(setLogoutTimer(expirationTime));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
    });
  };
};

export const signIn = (phoneNumber, password) => {
  return async dispatch => {
    const response = await fetch('https://printed-server.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        password: password
      })
    });

    if(!response.ok) {
      const errorResponseData = await response.json();
      const errorMessage = errorResponseData.status === 403 ? "Неверные данные" : "Неизвестная ошибка";
      
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    dispatch(authenticate(`Bearer_${responseData.token}`, responseData.id, responseData.expire));

    // Dispatching to user store
    dispatch({
      type: SET_BASIC_USER_DATA,
      phoneNumber: responseData.phoneNumber,
      email: responseData.email,
      userName: responseData.name
    });
    
    const tokenExpirationDate = new Date(new Date().getTime() + responseData.expire);
    saveAuthDataToStorage(
      `Bearer_${responseData.token}`, responseData.id, responseData.name, responseData.email, responseData.phoneNumber, tokenExpirationDate
    );
  }
}

export const signUp = (name, phoneNumber, email, password, cardNumber) => {
  return async dispatch => {
    const response = await fetch('https://printed-server.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        phoneNumber: phoneNumber, 
        email: email,
        password: password,
        cardNumberCut: cardNumber.slice(12),
        roleName: 'client'
      })
    });

    if(!response.ok) {
      const errorResponseData = await response.json();
      const errorMessage = errorResponseData.status === 409 ? 
        'Пользователь с таким номером телефона или e-mail адресом уже существует' :
        'Неизвестная ошибка';

      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log(responseData);

    dispatch({type: SIGN_UP});
  }
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT
  };
};