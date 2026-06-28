import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import TodoScreen from './screens/TodoScreen';
import ImportantTodoScreen from './screens/ImportantTodoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TodoApp' }} />
        <Stack.Screen name="Todo" component={TodoScreen} options={{ title: 'Daily' }} />
        <Stack.Screen name="ImportantTodo" component={ImportantTodoScreen} options={{ title: 'Important ' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}