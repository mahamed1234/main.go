import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./pages/Home/Home";
import { Forecast } from "./pages/Forecast/Forecast";
import { FavoritesPage } from "./pages/favorites/FavoritesPage";
import { Ionicons } from "@expo/vector-icons"; // Assuming you are using Expo for vector icons

import * as Font from 'expo-font';
import YourMapComponent from "./pages/maps/maps";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  colors: {
    background: "transparent",
  },
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Forecast" component={Forecast} />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#ffff' },
          tabBarLabel: route.name === 'HomeTab' ? 'Homepage' : route.name === 'FavoritesTab' ? 'Favorites' : 'Maps',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = 'home';
            } else if (route.name === 'FavoritesTab') {
              iconName = 'heart';
            } else if (route.name === 'maps') {
              iconName = 'map'; 
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="FavoritesTab" component={FavoritesPage} />
        <Tab.Screen name="maps" component={YourMapComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
