import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Switch,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Animated,
} from 'react-native';
 
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
import { SafeAreaView } from 'react-native-safe-area-context';
 
const image = require('../assets/Unknown.jpg');
 
const menuItems = [
  { id: '1', label: 'Daily Todos', route: 'Todo' },
  { id: '2', label: 'Important Todos', route: 'ImportantTodo' },
  { id: '3', label: 'Test Screen', route: 'TestScreen' },
  { id: '4', label: 'View Screen', route: 'ViewScreen' },
  { id: '5', label: 'Fetch test', route: 'FetchApi' },
  { id: '6', label: 'Weather', route: 'Weather' },
];
 

const FadeInView = ({ style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000, 
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
 
  return (
    <Animated.View style={[style, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};
 
const HomeScreen = observer(({ navigation }) => {
  const { themeStore } = useStores();
  const [refreshing, setRefreshing] = useState(false);
 
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
 
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
 
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={themeStore.isDarkMode ? '#fff' : '#000'} // لون الدائرة الدوارة في iOS
              colors={['#81b0ff']}
            />
          }
        >
          <View style={styles.switchContainer}>
            <Text style={{ color: themeStore.isDarkMode ? '#fff' : '#000', marginRight: 8 }}>
              {themeStore.isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={themeStore.isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={themeStore.toggleTheme}
              value={themeStore.isDarkMode}
            />
          </View>
 
          
          <FadeInView>
            <Text
              style={[
                styles.title,
                { color: themeStore.isDarkMode ? '#fff' : '#000' },
              ]}
            >
              MyTodoApp
            </Text>
          </FadeInView>
 
          <View style={styles.cardsGrid}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  { backgroundColor: themeStore.isDarkMode ? '#2a2a2a' : '#ffffff' },
                ]}
                onPress={() => navigation.navigate(item.route)}
                activeOpacity={0.7}
              >
                <Text style={[styles.cardLabel, { color: themeStore.isDarkMode ? '#fff' : '#180113' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
});
 
export default HomeScreen;
 
const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  container: { flex: 1, paddingHorizontal: 20 },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
  },
  switchContainer: { position: 'absolute', top: 10, right: 0, flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 40, marginBottom: 30, fontWeight: 'bold' },
  cardsGrid: { flexDirection: 'column', width: '100%', gap: 16 },
  card: {
    width: '100%',
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
});