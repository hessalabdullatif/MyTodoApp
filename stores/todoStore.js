import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';

class TodoStore {
  dailyItems = [];      
  importantItems = [];  

  constructor() {
    makeAutoObservable(this); 

    makePersistable(this, {
      name: 'TodoStore', 
      properties: ['dailyItems', 'importantItems'], 
      storage: AsyncStorage,
    });
  }

 
  addDailyTodo = text => {
    this.dailyItems.push({
      id: Date.now().toString(),
      text,
      done: false,
    });
  };

  toggleDailyTodo = id => {
    const todo = this.dailyItems.find(item => item.id === id);
    if (todo) todo.done = !todo.done;
  };

  removeDailyTodo = id => {
    this.dailyItems = this.dailyItems.filter(item => item.id !== id);
  };

  get dailyTotalCount() {
    return this.dailyItems.length;
  }

  get dailyDoneCount() {
    return this.dailyItems.filter(item => item.done).length;

  }
  get reversedDailyItems() {
  return this.dailyItems.slice().reverse();
}

get reversedImportantItems() {
  return this.importantItems.slice().reverse();
}

  
  addImportantTodo = text => {
    this.importantItems.push({
      id: Date.now().toString(),
      text,
      done: false,
    });
  };

  toggleImportantTodo = id => {
    const todo = this.importantItems.find(item => item.id === id);
    if (todo) todo.done = !todo.done;
  };

  removeImportantTodo = id => {
    this.importantItems = this.importantItems.filter(item => item.id !== id);
  };

  get importantTotalCount() {
    return this.importantItems.length;
  }

  get importantDoneCount() {
    return this.importantItems.filter(item => item.done).length;
  }
}

export default new TodoStore(); 