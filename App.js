import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {createStore, combineReducers} from 'redux';
import authReducer from './store/reducers/auth';
import { Provider } from 'react-redux';

const rootReducer = combineReducers(
  {
    auth: authReducer
  }
);

const store = createStore(rootReducer);

export default function App() {
  const [output, setOutput] = useState('Hello, World!');

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Моё приложение на React Native</Text>
        <Text>{output}</Text>
        <Button title="Change Text" onPress={() => setOutput('Привет, мир!')} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
