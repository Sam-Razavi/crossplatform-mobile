import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nextProvider } from "react-i18next";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import i18n from "./i18n";
import { Settings } from "./src/screens/Settings/Settings";
import { UserForm } from "./src/screens/UserForm/UserForm";
import { UserInfo } from "./src/screens/UserInfo/UserInfo";
import UserList from "./src/screens/UserList/UserList";
import PostForm from "./src/screens/PostForm/PostForm"; // Import PostForm
import PostList from "./src/screens/PostList/PostList"; // Import PostList
import { persistor, store } from "./src/store/store";

const UserListStack = createNativeStackNavigator();

function UserListStackScreen() {
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
      <UserListStack.Screen name="UserForm" component={UserForm} />
    </UserListStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function NavigationWrapper() {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="UserListStack"
          component={UserListStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="UserForm" component={UserForm} />
        {loggedInAs && (
          <Tab.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              title: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
            }}
          />
        )}
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="PostForm" component={PostForm} options={{ title: 'Create Post' }} />
        <Tab.Screen name="PostList" component={PostList} options={{ title: 'Posts' }} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <NavigationWrapper />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}
