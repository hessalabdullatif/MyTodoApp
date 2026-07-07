import React, {useState} from 'react';
import {ImageBackground, 
    StyleSheet, 
    Text,
    View, 
    ScrollView, 
    Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
// 1. استيراد useTheme من حزمة React Navigation
import { useTheme } from '@react-navigation/native';

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

const TestScreen = ({navigation}) => {
  const [isEveningMode, setIsEveningMode] = useState(false);
  
  // 2. تفعيل الـ Hook لجلب الألوان الحالية للتطبيق وحالة الـ Dark Mode
  const { colors, dark } = useTheme();

  const toggleMode = () => setIsEveningMode(previousState => !previousState);
  const currentAzkar = isEveningMode ? eveningAzkarData : morningAzkarData;

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.background}>
      {/* 3. جعل الـ overlay داكناً في الوضع المظلم لمنح النصوص البيضاء وضوحاً ممتازاً */}
      <View 
        style={[
          styles.overlay, 
          { backgroundColor: dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' }
        ]} 
      />

      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.switchRow}>
          {/* 4. ربط لون نص الـ Switch بلون نصوص الثيم */}
          <Text style={[styles.switchLabel, {color: colors.text}]}>
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

        {/* 5. ربط لون العنوان الأساسي بالثيم */}
        <Text style={[styles.title, {color: colors.text}]}>
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
              // 6. جعل خلفية الكرت تتبع colors.card وتحديد حدود خفيفة في الـ Dark Mode
              style={[
                styles.card, 
                { 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: dark ? 1 : 0
                }
              ]}
            >
              <View style={styles.cardHeader}>
                {/* 7. تلوين أيقونة الشمس/القمر بلون الهوية الموحد للتطبيق (colors.primary) */}
                <Ionicons
                  name={zekr.icon}
                  size={28}
                  color={colors.primary}
                />
                <Text style={[styles.cardTitle, {color: colors.text}]}>
                  {zekr.title}
                </Text>
              </View>

              <Text style={[styles.cardText, {color: colors.text}]}>
                {zekr.text}
              </Text>

              {/* 8. جعل لون عداد الذكر رمادياً خفيفاً بالوضع المظلم لراحة العين */}
              <Text style={[styles.cardCount, {color: dark ? '#aaa' : '#888'}]}>
                {zekr.count}
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
  // تنويه: قمنا بحذف الـ backgroundColor: "pink" الثابتة من هنا حتى لا تتدخل الألوان وتخرب الثيم
  cardHeader: {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12},
  cardTitle: {fontSize: 18, fontWeight: 'bold'},
  cardText: {fontSize: 16, lineHeight: 26, textAlign: 'right'},
  cardCount: {fontSize: 13, marginTop: 12, textAlign: 'left'},
});