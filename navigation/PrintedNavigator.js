import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';

import AuthScreen from '../screens/user/AuthScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

const MainNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Profile: ProfileScreen
  }
);

export default createAppContainer(MainNavigator);
