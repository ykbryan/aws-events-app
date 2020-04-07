import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HistoryScreen from './Screens/HistoryScreen';
import AccountScreen from './Screens/AccountScreen';
import DetailsScreen from './Screens/DetailsScreen';
import HomeScreen from './Screens/HomeScreen';
import EventScreen from './Screens/EventScreen';
import ChatScreen from './Screens/ChatScreen';
import CreateScreen from './Screens/CreateScreen';
import ModalScreen from './Screens/AuthScreen';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function getHeaderTitle(route) {
//   const routeName = route.name;
//   switch (routeName) {
//     case 'History':
//       return 'My Travel Records';
//     case 'Settings':
//       return 'My Settings';
//     default:
//       return 'Welcome';
//   }
// }

function shouldHeaderBeShown(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'HomeTab';

  switch (routeName) {
    // case 'HomeTab':
    // case 'HistoryTab':
    // case 'SettingsTab':
    default:
      return false;
    //   return true;
  }
}

const HomeTabNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == 'Home') iconName = 'ios-home';
          else if (route.name == 'History') iconName = 'ios-globe';
          else if (route.name == 'Account') iconName = 'ios-person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={(route) => ({
          title: 'Home',
          headerShown: shouldHeaderBeShown(route),
        })}
        name='Home'
        component={HomeScreen}
      />
      <Tab.Screen
        options={() => ({
          title: 'ASD',
        })}
        name='Account'
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={() => ({
          title: 'Settings',
          headerShown: false,
        })}
        name='HomeTabNavigator'
        component={HomeTabNavigator}
      />
      <HomeStack.Screen
        options={() => ({
          headerShown: false,
        })}
        name='Details'
        component={DetailsScreen}
      />
      <HomeStack.Screen
        options={() => ({
          headerShown: false,
        })}
        name='Event'
        component={EventScreen}
      />
      <HomeStack.Screen
        options={() => ({
          headerShown: false,
        })}
        name='Chat'
        component={ChatScreen}
      />
    </HomeStack.Navigator>
  );
};

export default function AppContainer() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal' }}
      headerMode='float'
      mode='modal'
    >
      <Stack.Screen
        options={({ route }) => ({
          headerShown: shouldHeaderBeShown(route),
        })}
        name='HomeStackNavigator'
        component={HomeStackNavigator}
      />
      <Stack.Screen
        options={() => ({
          headerShown: false,
        })}
        name='Create'
        component={CreateScreen}
      />
      <Stack.Screen
        options={() => ({
          headerShown: false,
        })}
        name='Modal'
        component={ModalScreen}
      />
    </Stack.Navigator>
  );
}
