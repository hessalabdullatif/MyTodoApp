import React, {useState} from 'react';
import {ImageBackground, 
    StyleSheet, 
    Text,
     View, 
    ScrollView, 
    Switch,
    SectionList,
    StatusBar
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import useStores from '../hooks/useStores';

const image = require('../assets/Unknown.jpg');

const morningAzkarData = [
  {
    id: 'm1',
    icon: 'sunny-outline',
    title: 'دعاء بداية اليوم',
    text: 'اللهم بك اصبحنا وبك امسينا وبك نحيا وبك نموت واليك النشور',
    count: 'مرة واحدة',
  },
  {
    id: 'm2',
    icon: 'sunny-outline',
    title: 'سيد الاستغفار',
    text: 'اللهم انت ربي لا اله الا انت خلقتني وانا عبدك',
    count: 'مرة واحدة',
  },
  {
    id: 'm3',
    icon: 'sunny-outline',
    title: 'التسبيح',
    text: 'سبحان الله وبحمده',
    count: '100 مرة',
  },
  {
    id: 'm4',
    icon: 'sunny-outline',
    title: 'دعاء الحفظ',
    text: 'بسم الله الذي لا يضر مع اسمه شيء في الارض ولا في السماء',
    count: 'مرة واحدة',
  },
];

const eveningAzkarData = [
  {
    id: 'e1',
    icon: 'moon-outline',
    title: 'دعاء بداية المساء',
    text: 'اللهم بك امسينا وبك اصبحنا وبك نحيا وبك نموت واليك المصير',
    count: 'مرة واحدة',
  },
  {
    id: 'e2',
    icon: 'moon-outline',
    title: 'آية الكرسي',
    text: 'الله لا اله الا هو الحي القيوم',
    count: 'مرة واحدة',
  },
  {
    id: 'e3',
    icon: 'moon-outline',
    title: 'التسبيح',
    text: 'سبحان الله وبحمده عدد خلقه ورضا نفسه',
    count: '3 مرات',
  },
  {
    id: 'e4',
    icon: 'moon-outline',
    title: 'دعاء قبل النوم',
    text: 'باسمك اللهم اموت واحيا',
    count: 'مرة واحدة',
  },
  {
    id: 'e5',
    icon: 'moon-outline',
    title: 'دعاء',
    text: 'باسمك اللهم اموت واحيا',
    count: 'مرة واحدة',
  },
];

const TestScreen = observer(({navigation}) => {
  const {themeStore} = useStores();

  
  const [isEveningMode, setIsEveningMode] = useState(false);
  const toggleMode = () => setIsEveningMode(previousState => !previousState);

  const currentAzkar = isEveningMode ? eveningAzkarData : morningAzkarData;

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.background}>
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: themeStore.isDarkMode
              ? 'rgba(0, 0, 0, 0.75)'
              : 'rgba(255, 255, 255, 0.6)',
          },
        ]}
      />

      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, {color: themeStore.isDarkMode ? '#fff' : '#180113'}]}>
            {isEveningMode ? 'أذكار المساء' : 'أذكار الصباح'}
          </Text>
          <Switch
            trackColor={{false: '#FFD60A', true: '#3A3A5C'}}
            thumbColor={isEveningMode ? '#f5dd4b' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleMode}
            value={isEveningMode}
          />
        </View>

        <Text style={[styles.title, {color: themeStore.isDarkMode ? '#fff' : '#180113'}]}>
          {isEveningMode ? 'أذكار المساء' : 'أذكار الصباح'}
        </Text>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.cardsColumn}
          showsVerticalScrollIndicator={false}
        >
          {currentAzkar.map(zekr => (
            <View
              key={zekr.id}
              style={[styles.card, {backgroundColor: themeStore.isDarkMode ? '#1E1E2E' : '#ffffff'}]}
            >
              <View style={styles.cardHeader}>
                <Ionicons
                  name={zekr.icon}
                  size={28}
                  color={themeStore.isDarkMode ? '#FFD60A' : '#4630EB'}
                />
                <Text style={[styles.cardTitle, {color: themeStore.isDarkMode ? '#fff' : '#180113'}]}>
                  {zekr.title}
                </Text>
              </View>

              <Text style={[styles.cardText, {color: themeStore.isDarkMode ? '#ddd' : '#333'}]}>
                {zekr.text}
              </Text>

              <Text style={[styles.cardCount, {color: themeStore.isDarkMode ? '#999' : '#888'}]}>
                {zekr.count}
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
});

export default TestScreen;

const styles = StyleSheet.create({
  background: {flex: 1},
  overlay: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  container: {flex: 1, paddingHorizontal: 20, paddingTop: 20},
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {fontSize: 16, fontWeight: '600'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center'},
  scrollArea: {flex: 1},
  cardsColumn: {flexDirection: 'column', gap: 16, paddingBottom: 20},
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12, backgroundColor:"pink"},
  cardTitle: {fontSize: 18, fontWeight: 'bold'},
  cardText: {fontSize: 16, lineHeight: 26, textAlign: 'right'},
  cardCount: {fontSize: 13, marginTop: 12, textAlign: 'left'},
});