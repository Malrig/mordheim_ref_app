import { Stack, Slot } from 'expo-router';

import { Provider } from 'tinybase/ui-react';
import { DataStore } from '../library/stores/data/store';
import { AuthStore } from '../library/stores/auth/store';
import { UserStore } from '../library/stores/user/store';

export default function RootLayout() {
  return (
    <Provider>
      <AuthStore />
      <Slot/>
    </Provider>
  );
}

