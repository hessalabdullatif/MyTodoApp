import React, { useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
// 1. استيراد useTheme من حزمة التنقل للاستماع لتغير مظهر النظام
import { useTheme } from '@react-navigation/native';

const image = require('../assets/Unknown.jpg');
const keyExtractor = item => item.id.toString();

const ImportantTodoScreen = observer(({ navigation }) => {
  const { todoStore } = useStores();
  const [todoText, setTodoText] = useState('');
  const [searchText, setSearchText] = useState('');

  // 2. تفعيل الـ Hook لاستخراج الألوان وحالة المظهر الحالي (dark)
  const { colors, dark } = useTheme();

  const handleAdd = () => {
    if (todoText.trim().length === 0) return;
    todoStore.addImportantTodo(todoText.trim());
    setTodoText('');
    Keyboard.dismiss();
  };

  const filteredItems = todoStore.reversedImportantItems.filter(item =>
    item.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.background}>
      {/* 3. تعديل الـ overlay ديناميكياً (أسود شفاف في الوضع المظلم ليعطي تباين مريح) */}
      <View 
        style={[
          styles.overlay, 
          { backgroundColor: dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' }
        ]} 
      />

      <SafeAreaView style={styles.container}>

        {/* 4. تحديث شريط البحث ليتغير لونه بناءً على colors.card */}
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <Ionicons name="search" size={24} color={colors.text} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={dark ? '#aaa' : '#888'}
            style={[styles.searchInput, { color: colors.text }]}
            clearButtonMode="always"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              colors={colors} // 5. تمرير الألوان لعنصر القائمة بالأسفل
              dark={dark}
              onDelete={() => todoStore.removeImportantTodo(item.id)}
              onToggle={() => todoStore.toggleImportantTodo(item.id)}
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
          {/* 6. زر الإضافة يتلون باللون المخصص لك (primary: '#d650b4') */}
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary }]} 
            onPress={handleAdd}
          >
            <Ionicons name="add" size={24} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
});

export default ImportantTodoScreen;

// 7. تحديث الـ TodoItem لتستقبل الـ colors من الـ Props وتتحول تلقائياً
const TodoItem = observer(({ todo, onDelete, onToggle, colors, dark }) => (
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
      {/* الـ Checkbox يأخذ لون الـ primary الوردي المخصص لك عند التحديد */}
      <Checkbox
        value={todo.done}
        onValueChange={onToggle}
        color={todo.done ? colors.primary : undefined}
      />
      <Text
        style={[
          styles.todoText,
          { color: colors.text },
          todo.done && { textDecorationLine: 'line-through', color: dark ? '#777' : '#aaa' },
        ]}
      >
        {todo.text}
      </Text>
    </View>
    <TouchableOpacity onPress={onDelete}>
      {/* أيقونة الحذف تظهر بلون أحمر فاتح ومريح في الوضع المظلم لتجنب توهج اللون الفاقع */}
      <Ionicons name="trash" size={24} color={dark ? '#ff6b6b' : 'red'} />
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  container: { flex: 1, paddingHorizontal: 20 },
  searchBar: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  searchInput: { flex: 1, fontSize: 16 },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: { flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1 },
  todoText: { fontSize: 16 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 10 },
  newTodoInput: { flex: 1, padding: 16, borderRadius: 10, fontSize: 16 },
  addButton: {
    padding: 16,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});