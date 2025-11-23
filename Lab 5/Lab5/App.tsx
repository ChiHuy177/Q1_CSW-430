/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pages/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import ServicesScreen, { Service } from './src/pages/ServiceScreen';
import { House, LayoutGrid, Settings, Users } from 'lucide-react-native';
import ServiceDetailScreen from './src/pages/ServiceDetailScreen';
import CreateServiceScreen from './src/pages/AddNewScreen';
import { MenuProvider } from 'react-native-popup-menu';
import EditServiceScreen from './src/pages/EditServiceScreen';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type TabParamList = {
  Home: undefined;
  Services: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type ServicesStackParamList = {
  ServicesList: undefined;
  ServiceDetail: { service: Service };
  AddNewService: undefined;
  EditService: { service: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const ServicesStack = createNativeStackNavigator<ServicesStackParamList>();

function ServicesStackNavigator() {
  return (
    <ServicesStack.Navigator screenOptions={{ headerShown: false }}>
      <ServicesStack.Screen name="ServicesList" component={ServicesScreen} />
      <ServicesStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Chi tiết dịch vụ',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ServicesStack.Screen
        name="AddNewService"
        component={CreateServiceScreen}
        options={{
          headerShown: true,
          headerTitle: 'Thêm mới dịch vụ',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ServicesStack.Screen
        name="EditService"
        component={EditServiceScreen} 
        options={{
          headerShown: true,
          headerTitle: 'Chỉnh sửa dịch vụ',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </ServicesStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarActiveTintColor: '#f2546b',
        tabBarInactiveTintColor: '#9b9b9b',
      }}
    >
      <Tab.Screen
        name="Home"
        component={ServicesStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>
              <House />
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Dịch vụ',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>
              <LayoutGrid />
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ServicesScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>
              <Users />
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ServicesScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>
              <Settings />
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Login">
              {props => (
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main" component={TabNavigator} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;
