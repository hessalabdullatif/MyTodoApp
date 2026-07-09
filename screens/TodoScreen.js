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
import {useTheme} from '@react-navigation/native';

const image = require('../assets/Unknown.jpg');
const keyExtractor = item => item.id.toString();

const TodoScreen = observer(({navigation}) => {
  const {todoStore} = useStores();
  const [todoText, setTodoText] = useState('');
  const [searchText, setSearchText] = useState('');

  const {colors, dark} = useTheme();

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
          { backgroundColor: dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' }
        ]} 
      />

      <SafeAreaView style={styles.container}>

        <View style={[styles.searchBar, {backgroundColor: colors.card}]}>
          <Ionicons name="search" size={24} color={colors.text} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={dark ? '#aaa' : '#888'}
            style={[styles.searchInput, {color: colors.text}]}
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
              colors={colors} 
              dark={dark}
              onDelete={() => todoStore.removeDailyTodo(item.id)}
              onToggle={() => todoStore.toggleDailyTodo(item.id)}
            />
          )}
        />

        <View style={styles.footer}>
          <TextInput
            placeholder="Add New Task"
            placeholderTextColor={dark ? '#aaa' : '#888'}
            value={todoText}
            onChangeText={setTodoText}
            style={[
              styles.newTodoInput,
              {
                backgroundColor: colors.card,
                color: colors.text,
              },
            ]}
          />
          <TouchableOpacity 
            style={[styles.addButton, {backgroundColor: colors.primary}]} 
            onPress={handleAdd}
          >
            <Ionicons name="add" size={24} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
});

export default TodoScreen;

const TodoItem = observer(({todo, onDelete, onToggle, colors, dark}) => (
  <View 
    style={[
      styles.todoContainer, 
      { 
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: dark ? 1 : 0 
      }
    ]}
  >
    <View style={styles.todoInfoContainer}>
      <Checkbox
        value={todo.done}
        onValueChange={onToggle}
        color={todo.done ? colors.primary : undefined}
      />
      <Text
        style={[
          styles.todoText,
          {color: colors.text},
          todo.done && {textDecorationLine: 'line-through', color: dark ? '#777' : '#aaa'},
        ]}
      >
        {todo.text}
      </Text>
    </View>
    <TouchableOpacity onPress={onDelete}>
      <Ionicons name="trash" size={24} color={dark ? '#ff6b6b' : 'red'} />
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  background: {flex: 1},
  overlay: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  container: {flex: 1, paddingHorizontal: 20},
  searchBar: {
    flexDirection: 'row',
    padding: 15,
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
    padding: 16,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});