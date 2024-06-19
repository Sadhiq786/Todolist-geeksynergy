import { createSlice } from '@reduxjs/toolkit';

const savelocalStorage = (state) => {
  localStorage.setItem('todos', JSON.stringify(state));
};

const loadinglocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: loadinglocalStorage(),
  reducers: {
    addTodo: (state, action) => {
      const newTodo = { id: Date.now(), text: action.payload.text, completed: action.payload.completed === "Completed", time: new Date().toLocaleString() };
      state.push(newTodo);
      savelocalStorage(state);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      savelocalStorage(state);
    },
    removeTodo: (state, action) => {
      const newState = state.filter(todo => todo.id !== action.payload);
      savelocalStorage(newState);
      return newState;
    },
    updateTodo: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
      savelocalStorage(state);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
