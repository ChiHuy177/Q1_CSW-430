/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { applicationStore } from './src/stores/ApplicationStore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactPage } from './src/pages/Contact';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavouritePage } from './src/pages/Favorite';
import { ContactDetailPage } from './src/pages/ContactDetail';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function ContactScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetailPage}
        options={{ title: 'Profile contact' }}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactPage}
        options={{ title: 'Contacts' }}
      />
    </Stack.Navigator>
  );
}

function FavouriteScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetailPage}
        options={{ title: 'Profile contact' }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavouritePage}
        options={{ title: 'Favorites' }}
      />
    </Stack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Contacts"
    >
      <Tab.Screen
        name="Contacts"
        component={ContactScreens}
        options={{
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>👥</Text>,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteScreens}
        options={{
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>⭐</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Contacts"
    >
      <Drawer.Screen
        name="Contacts"
        component={ContactScreens}
        options={{ title: 'Contacts' }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouriteScreens}
        options={{
          title: 'Favourites',
        }}
      />
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <Provider store={applicationStore}>
      <NavigationContainer>
        <DrawerNavigator />
        {/* <TabNavigator /> */}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
