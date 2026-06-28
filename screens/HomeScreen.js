import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>MyTodoApp</Text>
      <Button title="Daily todos " onPress={() => navigation.navigate('Todo')} />
      <View style={{ marginTop: 10 }} />
      <Button title="Important Todos" onPress={() => navigation.navigate('ImportantTodo')} />
    </View>
  );
}