import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import {db} from '../../Service/firebase';


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todosRef = collection(db, 'todos');
  const snapshot = await getDocs(todosRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const todosRef = collection(db, 'todos');
  const newTodoRef = await addDoc(todosRef, todo);
  return { id: newTodoRef.id, ...todo };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const todoRef = doc(db, 'todos', todo.id);
  await updateDoc(todoRef, todo);
  return todo;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
  const todoRef = doc(db, 'todos', todoId);
  await deleteDoc(todoRef);
  return todoId;
});
const todosSlice = createSlice({
  name: 'client',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
