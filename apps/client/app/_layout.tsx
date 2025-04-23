import { Slot } from 'expo-router';

import { Provider } from 'tinybase/ui-react';
import { AuthStoreProvider } from '../library/stores/auth/store';

export default function RootLayout() {
  return (
    <Provider>
      <AuthStoreProvider />
      <Slot/>
    </Provider>
  );
}

