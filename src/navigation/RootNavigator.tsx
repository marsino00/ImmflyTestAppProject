import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import TicketPage from '../pages/TicketPage/TicketPage';

export type RootStackParamList = {
  Catálogo: undefined;
  Ticket: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Catálogo" component={CatalogPage} />
        <Stack.Screen name="Ticket" component={TicketPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
