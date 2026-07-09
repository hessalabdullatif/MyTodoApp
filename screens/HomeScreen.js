import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Animated,
  Switch, 
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../ThemeContext';
const image = require('../assets/Unknown.jpg');

const menuItems = [

  { id: '3', label: 'Athkhar', route: 'TestScreen' },
  { id: '4', label: 'Movies', route: 'ViewScreen' },
  { id: '5', label: 'Fetch Weather', route: 'FetchApi' },
  { id: '6', label: 'Axios Weather', route: 'Weather' },
    { id: '7', label: 'Form Sheet', route: 'FormSheet' },


];

const FadeInView = ({ style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[style, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { colors, dark } = useTheme();
  const { isDark, toggleTheme } = useAppTheme(); 

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
          { backgroundColor: dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' }
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
              tintColor={colors.text}
              colors={[colors.primary]}
            />
          }
        >
          <FadeInView>
            <Text style={[styles.title, { color: colors.text }]}>
              MyTodoApp
            </Text>
          </FadeInView>

         
          <View style={styles.themeSwitchRow}>
            <Text style={{ color: colors.text }}>Dark Mode</Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>

          <View style={styles.cardsGrid}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: dark ? 1 : 0
                  }
                ]}
                onPress={() => navigation.navigate(item.route)}
                activeOpacity={0.7}
              >
                <Text style={[styles.cardLabel, { color: colors.text }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
  title: { fontSize: 40, marginBottom: 30, fontWeight: 'bold' },
  themeSwitchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
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