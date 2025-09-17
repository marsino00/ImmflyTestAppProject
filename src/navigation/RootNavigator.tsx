import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CatalogPage from '../pages/CatalogPage';

export type RootStackParamList = {
  Catalog: undefined;
  Ticket: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Catalog" component={CatalogPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
