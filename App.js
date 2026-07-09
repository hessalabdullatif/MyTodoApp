import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoresContext from './context.js';
import todoStore from './stores/todoStore';
import { ThemeProvider, useAppTheme } from './ThemeContext.js';
import TodoScreen from './screens/TodoScreen';
import ImportantTodoScreen from './screens/ImportantTodoScreen';
import TestScreen from './screens/TestScreen';
import ViewScreen from './screens/ViewScreen';
import FetchApi from './screens/FetchApi';
import WeatherScreen from './screens/WeatherScreen';
import HomeScreen from './screens/HomeScreen.js';
import FormSheet from './screens/FormSheet.js';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
// i added the most important component "in my app"the demo was diffrent
function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={{
      // i can also make it fade but i like the shift more
      animation : "shift",
    }}>
      <Tabs.Screen name="Todo" component={TodoScreen} options={{ title: 'Daily' }} />
            <Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />

      <Tabs.Screen
        name="ImportantTodo"
        component={ImportantTodoScreen}
        options={{ title: 'Important' }}
      />
    </Tabs.Navigator>
  );
}

function Navigation() {
  const { theme } = useAppTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="ViewScreen" component={ViewScreen} options={{ title: 'Movies' }} />
        <Stack.Screen name="FetchApi" component={FetchApi} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'Weather' }} />
        <Stack.Screen name="FormSheet" component={FormSheet} options={{ title: 'Form' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <StoresContext.Provider value={{ todoStore }}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </StoresContext.Provider>
  );
}