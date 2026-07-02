import {createContext} from 'react';
import todoStore from './stores/todoStore';
import themeStore from './stores/themeStore'; 

const StoresContext = createContext({
  todoStore,
  themeStore, 
});

export default StoresContext;