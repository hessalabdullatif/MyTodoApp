import {createContext} from 'react';
import todoStore from './stores/todoStore';

export const storesContext = createContext({
  todoStore, // both lists live inside this one store now
});