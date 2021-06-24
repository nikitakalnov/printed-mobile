import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { enableScreens } from "react-native-screens";

import NavigationContainer from "./navigation/NavigationContainer";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";
import ordersReducer from "./store/reducers/orders";
import { documentReducer } from "./store/reducers/documents";

import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  orders: ordersReducer,
  documents: documentReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
