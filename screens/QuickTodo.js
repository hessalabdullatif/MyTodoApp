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
import {useTheme} from '@react-navigation/native';

const keyExtractor = item => item.id.toString();

const QuickTodoScreen = observer(({navigation}) => {
  const {todoStore} = useStores();
  const [todoText, setTodoText] = useState('');

  const {colors, dark} = useTheme();

  const handleAdd = () => {
    if (todoText.trim().length === 0) return;
    todoStore.addDailyTodo(todoText.trim());
    setTodoText('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {borderBottomColor: colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.cancelText, {color: colors.text}]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.text}]}>Quick Todo</Text>
        <View style={{width: 50}} />
      </View>

      <FlatList
        data={todoStore.reversedDailyItems}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
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
          autoFocus
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
  );
});

export default QuickTodoScreen;

const TodoItem = observer(({todo, onDelete, onToggle, colors, dark}) => (
  <View
    style={[
      styles.todoContainer,
      {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: dark ? 1 : 0,
      },
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
  container: {flex: 1, paddingHorizontal: 20},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  headerTitle: {fontSize: 17, fontWeight: '600'},
  cancelText: {fontSize: 16},
  listContent: {paddingTop: 10},
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
  footer: {flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, marginBottom: 10},
  newTodoInput: {flex: 1, padding: 16, borderRadius: 10, fontSize: 16},
  addButton: {
    padding: 16,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});