import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/AuthScreen';
import SignUpScreen from './Screens/AuthScreen';

const Stack = createStackNavigator();

export default function AuthContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
    </Stack.Navigator>
  );
}
