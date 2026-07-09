import {
  View,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native';

import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';

const image = require('../assets/Unknown.jpg');

const FormSheet = () => {
 const { colors, dark } = useTheme(); 

  return (
    <SafeAreaProvider>
       <ImageBackground source={image} resizeMode="cover" style={styles.background}>
          <View 
                style={[
                  styles.overlay, 
                  { backgroundColor: dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' }
                ]} 
              />
<Text style={styles.text}>formsheet</Text>

        </ImageBackground>
   </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({   
     background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent:'center',
    alignItems:'center'
  },
   overlay: { 
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0 
  },

  text: {
    fontSize: 35,
   
  },
});
export default FormSheet;