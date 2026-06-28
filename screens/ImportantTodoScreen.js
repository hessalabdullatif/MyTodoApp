import React, {useState} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Checkbox} from 'expo-checkbox';
import {observer} from 'mobx-react-lite';
import useStores from '../hooks/useStores';

const keyExtractor = item => item.id.toString();

const ImportantTodoScreen = observer(({navigation}) => {
  const {todoStore} = useStores();
  const [todoText, setTodoText] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleAdd = () => {
    if (todoText.trim().length === 0) return;
    todoStore.addImportantTodo(todoText.trim());
    setTodoText('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={'#333'} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={todoStore.reversedImportantItems}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <TodoItem
            todo={item}
            onDelete={() => todoStore.removeImportantTodo(item.id)}
            onToggle={() => todoStore.toggleImportantTodo(item.id)}
          />
        )}
      />

      <View style={styles.footer}>
        <TextInput
          placeholder="Add New Task"
          value={todoText}
          onChangeText={setTodoText}
          style={styles.newTodoInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Ionicons name="add" size={24} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

export default ImportantTodoScreen;


const TodoItem = observer(({todo, onDelete, onToggle}) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      <Checkbox
        value={todo.done}
        onValueChange={onToggle}
        color={todo.done ? '#4630EB' : undefined}
      />
      <Text
        style={[
          styles.todoText,
          todo.done && {textDecorationLine: 'line-through', color: '#aaa'},
        ]}
      >
        {todo.text}
      </Text>
    </View>
    <TouchableOpacity onPress={onDelete}>
      <Ionicons name="trash" size={24} color={'red'} />
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, backgroundColor: '#fda5de'},

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {flex: 1, fontSize: 16, color: '#333'},
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1},
  todoText: {fontSize: 16, color: '#333'},
  footer: {flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 10},
  newTodoInput: {flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 10, fontSize: 16, color: '#333'},
  addButton: {
    backgroundColor: '#4630EB',
    padding: 16,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});