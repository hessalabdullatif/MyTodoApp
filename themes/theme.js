import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const darkTheme = {
  ...DarkTheme, 
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#d650b4',
    background: '#0e0101',
    card: '#504747',
    text: '#ffffff',
    border: '#757575',
    notification: '#436195',
  }
};

export const lightTheme = {
  ...DefaultTheme, 
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#d650b4',
    background: '#ffffff',
    card: '#e0dede',
    text: '#2b2b2b',
    border: '#b7b7b7',
    notification: '#436195',
  }  
};