import {createContext} from 'react';
import todoStore from './stores/todoStore';


const StoresContext = createContext({
  todoStore,

});

export default StoresContext;