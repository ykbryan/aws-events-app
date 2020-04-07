import React, { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/AppContainer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
Amplify.configure(awsconfig);

const getActiveRouteName = (state) => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};

const loadFonts = async () => {
  // for native-base
  await Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
};

function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [isLoading, setIsLoading] = useState(true);
  const navigationRef = useRef();
  const routeNameRef = useRef();

  useEffect(() => {
    loadFonts();
    setIsLoading(!isLoading);

    // app state
    AppState.addEventListener('change', _handleAppStateChange);

    // this is for analytics
    const currentState = navigationRef.current.getRootState();
    if (currentState) routeNameRef.current = getActiveRouteName(currentState);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (appState !== nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        //TODO: add analytics here
      } else if (
        appState.match(/active|background/) &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('App went to the background!');
        //TODO: add analytics here
      }
      console.log('from:', appState, 'to:', nextAppState);
      setAppState(nextAppState);
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        if (state) {
          const currentRouteName = getActiveRouteName(state);

          if (!previousRouteName !== currentRouteName) {
            //TODO: Add analytics here
            console.log('tracking current screen:', currentRouteName);
          }
          routeNameRef.current = currentRouteName;
        }
      }}
    >
      {isLoading ? <AppLoading /> : <AppContainer />}
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
