import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import PrintedNavigator from './PrintedNavigator';

const NavigationContainer = props => {
  const navigatorRef = useRef();
  const isAuth = useSelector(state => Boolean(state.auth.token));

  const checkAuthentication = () => {
    if(!isAuth)
      navigatorRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
  };

  useEffect(checkAuthentication, [isAuth]);

  return <PrintedNavigator ref={navigatorRef} />;
};

export default NavigationContainer;