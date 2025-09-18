import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <RootNavigator />
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}
