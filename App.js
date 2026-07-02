import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoresContext from './context.js';
import todoStore from './stores/todoStore';
import themeStore from './stores/themeStore';
import HomeScreen from './screens/HomeScreen';
import TodoScreen from './screens/TodoScreen';
import ImportantTodoScreen from './screens/ImportantTodoScreen';
import TestScreen from './screens/TestScreen';
import ViewScreen from './screens/ViewScreen';
import FetchApi from './screens/FetchApi';
import WeatherScreen from './screens/WeatherScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoresContext.Provider value={{todoStore, themeStore}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TodoApp' }} />
          <Stack.Screen name="Todo" component={TodoScreen} options={{ title: 'Daily' }} />
          <Stack.Screen name="ImportantTodo" component={ImportantTodoScreen} options={{ title: 'Important' }} />
          <Stack.Screen name="TestScreen" component={TestScreen} />
          <Stack.Screen name="ViewScreen" component={ViewScreen} />
          <Stack.Screen name="FetchApi" component={FetchApi} />
<Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'ًWeather' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoresContext.Provider>
  );
}