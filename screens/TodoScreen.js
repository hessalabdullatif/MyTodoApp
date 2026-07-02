import React, {useState} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Checkbox} from 'expo-checkbox';
import {observer} from 'mobx-react-lite';
import useStores from '../hooks/useStores';

const image = require('../assets/Unknown.jpg');
const keyExtractor = item => item.id.toString();

const TodoScreen = observer(({navigation}) => {
  // نقرأ themeStore هنا بدل useState المحلي
  const {todoStore, themeStore} = useStores();
  const [todoText, setTodoText] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleAdd = () => {
    if (todoText.trim().length === 0) return;
    todoStore.addDailyTodo(todoText.trim());
    setTodoText('');
    Keyboard.dismiss();
  };

  const filteredItems = todoStore.reversedDailyItems.filter(item =>
    item.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.background}>
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: themeStore.isDarkMode
              ? 'rgba(0, 0, 0, 0.7)'
              : 'rgba(255, 255, 255, 0.6)',
          },
        ]}
      />

      <SafeAreaView style={styles.container}>

        <View
          style={[
            styles.searchBar,
            {backgroundColor: themeStore.isDarkMode ? '#333' : '#f5f5f5'},
          ]}
        >
          <Ionicons name="search" size={24} color={themeStore.isDarkMode ? '#fff' : '#333'} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={themeStore.isDarkMode ? '#aaa' : '#888'}
            style={[styles.searchInput, {color: themeStore.isDarkMode ? '#fff' : '#333'}]}
            clearButtonMode="always"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <TodoItem
              todo={item}
              isDarkMode={themeStore.isDarkMode}
              onDelete={() => todoStore.removeDailyTodo(item.id)}
              onToggle={() => todoStore.toggleDailyTodo(item.id)}
            />
          )}
        />

        <View style={styles.footer}>
          <TextInput
            placeholder="Add New Task"
            placeholderTextColor={themeStore.isDarkMode ? '#aaa' : '#888'}
            value={todoText}
            onChangeText={setTodoText}
            style={[
              styles.newTodoInput,
              {
                backgroundColor: themeStore.isDarkMode ? '#333' : '#fff',
                color: themeStore.isDarkMode ? '#fff' : '#333',
              },
            ]}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Ionicons name="add" size={24} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
});

export default TodoScreen;

const TodoItem = observer(({todo, onDelete, onToggle, isDarkMode}) => (
  <View style={[styles.todoContainer, {backgroundColor: isDarkMode ? '#2a2a2a' : '#fff'}]}>
    <View style={styles.todoInfoContainer}>
      <Checkbox
        value={todo.done}
        onValueChange={onToggle}
        color={todo.done ? '#4630EB' : undefined}
      />
      <Text
        style={[
          styles.todoText,
          {color: isDarkMode ? '#fff' : '#333'},
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
  background: {flex: 1},
  overlay: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  container: {flex: 1, paddingHorizontal: 20},
  searchBar: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
    marginTop: 20, 
  },
  searchInput: {flex: 1, fontSize: 16},
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1},
  todoText: {fontSize: 16},
  footer: {flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 10},
  newTodoInput: {flex: 1, padding: 16, borderRadius: 10, fontSize: 16},
  addButton: {
    backgroundColor: '#4630EB',
    padding: 16,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});