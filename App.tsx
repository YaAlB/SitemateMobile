import React from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { store } from './src/reducers/index';
import RootNavigator from './src/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}