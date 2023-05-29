import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamListStack } from './types';

import Home from './pages/Home';

const Stack = createNativeStackNavigator<RootParamListStack>();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default Router;
