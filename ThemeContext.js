import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './themes/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const deviceScheme = useColorScheme(); 
  console.log(deviceScheme)
  const [isDark, setIsDark] = useState(deviceScheme === 'dark');

  const toggleTheme = () => setIsDark(previous => !previous);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);