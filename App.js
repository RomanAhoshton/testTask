import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View ,Pressable} from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./BottomTab";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
