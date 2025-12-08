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
import {
  BadgeDollarSign,
  House,
  LayoutGrid,
  Settings,
  Users,
} from 'lucide-react-native';
import ServiceDetailScreen from './src/pages/ServiceDetailScreen';
import CreateServiceScreen from './src/pages/AddNewScreen';
import { MenuProvider } from 'react-native-popup-menu';
import EditServiceScreen from './src/pages/EditServiceScreen';
import CustomersScreen, { Customer } from './src/pages/CustomerScreen';
import CreateCustomerScreen from './src/pages/AddNewCustomerScreen';
import TransactionScreen from './src/pages/TransactionScreen';
import TransactionScreenDetail from './src/pages/TransactionScreenDetail';
import SettingsScreen from './src/pages/SettingsScreen';
import CustomerDetailScreen from './src/pages/CustomerDetailScreen';
import EditCustomerScreen from './src/pages/EditCustomerScreen';
import AddTransactionScreen from './src/pages/AddTransactionScreen';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type TabParamList = {
  Home: undefined;
  Transaction: undefined;
  Customer: undefined;
  Settings: undefined;
};

export type ServicesStackParamList = {
  ServicesList: undefined;
  ServiceDetail: { service: Service };
  AddNewService: undefined;
  EditService: { service: any };
};

export type CustomerStackParamList = {
  CustomerList: undefined;
  AddNewCustomer: undefined;
  CustomerDetail: { customerId: string };
  EditCustomer: { customerId: string };
};

export type TransactionStackParamList = {
  TransactionList: undefined;
  TransactionDetail: { transactionId: string };
  AddTransaction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const ServicesStack = createNativeStackNavigator<ServicesStackParamList>();
const CustomerStack = createNativeStackNavigator<CustomerStackParamList>();
const TransactionStack =
  createNativeStackNavigator<TransactionStackParamList>();

function TransactionStackNavigator() {
  return (
    <TransactionStack.Navigator screenOptions={{ headerShown: false }}>
      <TransactionStack.Screen
        name="TransactionList"
        component={TransactionScreen}
      />
      <TransactionStack.Screen
        name="TransactionDetail"
        component={TransactionScreenDetail}
        options={{
          headerShown: true,
          headerTitle: 'Chi tiết giao dịch',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <TransactionStack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          headerShown: true,
          headerTitle: 'Thêm giao dịch',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </TransactionStack.Navigator>
  );
}

function CustomerStackNavigator() {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="CustomerList" component={CustomersScreen} />
      <CustomerStack.Screen
        name="AddNewCustomer"
        component={CreateCustomerScreen}
        options={{
          headerShown: true,
          headerTitle: 'Thêm mới khách hàng',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <CustomerStack.Screen
        name="CustomerDetail"
        component={CustomerDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Chi tiết khách hàng',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <CustomerStack.Screen
        name="EditCustomer"
        component={EditCustomerScreen}
        options={{
          headerShown: true,
          title: 'Chỉnh sửa khách hàng',
          headerStyle: {
            backgroundColor: '#e91e63',
          },
          headerTintColor: '#fff',
        }}
      />
    </CustomerStack.Navigator>
  );
}

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

function TabNavigator({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (value: boolean) => void;
}) {
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
        name="Transaction"
        component={TransactionStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>
              <BadgeDollarSign />
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Khách hàng',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>
              <Users />
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>
              <Settings />
            </Text>
          ),
        }}
      >
        {props => <SettingsScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
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
              <Stack.Screen name="Main">
                {props => (
                  <TabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;
