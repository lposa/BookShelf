import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Main from '../screens/Main';

function MainNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator headerMode={'screen'}>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Main'
        component={Main}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
