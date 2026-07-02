import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class 
ThemeStore {
  isDarkMode = false; 
  constructor() {
    makeAutoObservable(this); 

    
    makePersistable(this, {
      name: 'ThemeStore',
      properties: ['isDarkMode'],
      storage: AsyncStorage,
    });
  }

  
  toggleTheme = () => {
    this.isDarkMode = !this.isDarkMode;
  };
}
export default new ThemeStore();
