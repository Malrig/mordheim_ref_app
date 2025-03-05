import { Text, View, Pressable, TextInput } from "react-native";
import { Stack, Tabs } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { Button } from "react-native-paper";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "@/library/store/store"

export default function RootLayout() {

  
  return <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Pressable onPress={() => persistor.purge()}>
          <Text>Purge data</Text>
        </Pressable>
        <Tabs />
      </PersistGate>
    </Provider>
  </>;
}
