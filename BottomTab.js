import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PhotosScreen from "./PhotosScreen";
import FavoritesScreen from "./FavoritesScreen";
import { Foundation } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Foundation name="photo" size={30} color="#28ebd7" />
          ),
        }}
        name="Photos"
        component={PhotosScreen}
      />
      <Tab.Screen    options={{
          tabBarIcon: () => (
            <Foundation name="heart" size={30} color="#28ebd7" />
          ),
        }}
      
      name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
