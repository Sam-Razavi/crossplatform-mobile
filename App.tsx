import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';;
import { Button } from '@rneui/base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserList from './src/screens/UserList/UserList';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { UserForm } from './src/screens/UserForm/UserForm';
import { ToastProvider } from 'react-native-toast-notifications'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserInfo } from './src/screens/UserInfo/UserInfo';

const UserListStack = createNativeStackNavigator()

const UserListStackScreen = () => {
    return (
        <UserListStack.Navigator>
            <UserListStack.Screen name='UserList' component={UserList} />
            <UserListStack.Screen name='UserInfo' component={UserInfo} />
        </UserListStack.Navigator>
    )
}


  const Tab = createBottomTabNavigator();;

export default function App() {
  return (
    <ToastProvider>
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="UserList" component={UserListStackScreen} />
        <Tab.Screen name="UserForm" component={UserForm}  />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
