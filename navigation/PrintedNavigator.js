import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

import Colors from "../constants/Colors";
import Status from "../constants/OrderStatuses";
import withStatus from "../screens/orders/overview/withStatus";

import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/user/auth/AuthScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import NewOrderScreen from "../screens/orders/placement/NewOrderScreen";
import SignUpScreen from "../screens/user/auth/SignUpScreen";
import { Platform } from "react-native";
import DefaultText from "../components/UI/DefaultText";

import OrdersScreen from "../screens/orders/overview/OrdersScreen";

import OrderPlacementScreen from "../screens/orders/placement/OrderPlacementScreen";

const TAB_BAR_ICON_SIZE = 24;

const loginNavigatorConfig = {
  SignIn: {
    screen: AuthScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => (
        <FontAwesome5
          name="sign-in-alt"
          size={TAB_BAR_ICON_SIZE}
          color={tabInfo.tintColor}
        />
      ),
      tabBarColor: Colors.primary,
      tabBarLabel: <DefaultText>Войти</DefaultText>,
      headerTitle: "Вход"
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => (
        <MaterialCommunityIcons
          name="account-plus"
          size={TAB_BAR_ICON_SIZE}
          color={tabInfo.tintColor}
        />
      ),
      tabBarColor: Colors.accent,
      tabBarLabel: <DefaultText>Регистрация</DefaultText>,
      headerTitle: "Регистрация"
    }
  }
};

const LoginNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(loginNavigatorConfig, {
        initialRouteName: "SignIn",
        activeColor: Colors.blue,
        shifting: true,
        labeled: true,
        navigationOptions: {
          headerTitle: "Войти в Printed",
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: "white"
        }
      })
    : createBottomTabNavigator(loginNavigatorConfig, {
        initialRouteName: "SignIn",
        tabBarOptions: {
          activeTintColor: Colors.accent,
          showLabel: false
        },
        navigationOptions: {
          headerTitle: "Войти в Printed"
        }
      });

const OrdersTabs = createMaterialTopTabNavigator(
  {
    Placed: {
      screen: withStatus(OrdersScreen, Status.placed),
      navigationOptions: {
        title: "Размещённые"
      },
      params: {
        status: Status.placed
      }
    },
    InWork: {
      screen: withStatus(OrdersScreen, Status.inwork),
      navigationOptions: {
        title: "В работе"
      },
      params: {
        status: Status.inwork
      }
    },
    Ready: {
      screen: withStatus(OrdersScreen, Status.ready),
      navigationOptions: {
        title: "Готовые"
      },
      params: {
        status: Status.ready
      }
    },
    Received: {
      screen: withStatus(OrdersScreen, Status.received),
      navigationOptions: {
        title: "Полученные"
      },
      params: {
        status: Status.received
      }
    }
  },
  {
    navigationOptions: {
      headerTitle: "Мои заказы",
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: "white"
    },
    lazy: true,
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: {
        backgroundColor: Colors.primary,
        height: 3
      },
      labelStyle: {
        fontFamily: "open-sans"
      },
      activeTintColor: Colors.primary,
      inactiveTintColor: "black",
      scrollEnabled: true
    }
  }
);

const OrderPlacementNavigator = createStackNavigator({
  NewOrder: {
    screen: NewOrderScreen,
    navigationOptions: navigationData => ({
      headerTitle: "Новый заказ",
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: "white",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Close"
            iconName="window-close"
            onPress={() => {
              navigationData.navigation.navigate("Orders");
            }}
          />
        </HeaderButtons>
      )
    })
  },
  PlacementInfo: {
    screen: OrderPlacementScreen,
    navigationOptions: {
      headerTitle: "Новый заказ",
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: "white"
    }
  }
});

const OrdersNavigator = createStackNavigator({
  Orders: OrdersTabs
});

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: tabInfo => (
          <Ionicons
            name="md-person"
            size={TAB_BAR_ICON_SIZE}
            color={tabInfo.tintColor}
          />
        ),
        tabBarColor: Colors.primary
        //tabBarLabel: <DefaultText>Регистрация</DefaultText>,
      }
    },
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => (
          <MaterialIcons
            name="list"
            size={TAB_BAR_ICON_SIZE}
            color={tabInfo.tintColor}
          />
        ),
        tabBarColor: Colors.primary
      }
    },
    NewOrder: {
      screen: OrderPlacementNavigator,
      navigationOptions: navigationData => ({
        tabBarIcon: tabInfo => (
          <MaterialCommunityIcons
            name="playlist-plus"
            size={TAB_BAR_ICON_SIZE}
            color={tabInfo.tintColor}
          />
        ),
        tabBarColor: Colors.primary,
        headerTitle: "Новый заказ"
      })
    }
  },
  {
    initialRouteName: "Profile",
    activeColor: Colors.blue,
    shifting: true,
    labeled: false
  }
);

const AuthNavigator = createStackNavigator({
  Auth: LoginNavigator
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: {
    screen: AuthNavigator
  },
  App: AppNavigator
});

export default createAppContainer(MainNavigator);
