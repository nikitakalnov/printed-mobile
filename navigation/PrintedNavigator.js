import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';

import AuthScreen from '../screens/user/AuthScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

const MainNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
      navigationOptions: { title: 'Аутентификация' }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Профиль'
      }
    }
  },
  {
    initialRouteName: 'Auth',
    defaultNavigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
  }
);

export default createAppContainer(MainNavigator);
