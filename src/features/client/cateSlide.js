import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import {db} from '../../Service/firebase'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  
  export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
    const categoriesRef = collection(db, 'categories');
    const newCategoryRef = await addDoc(categoriesRef, category);
    return { id: newCategoryRef.id, ...category };
  });
  
  export const updateCategory = createAsyncThunk('categories/updateCategory', async (category) => {
    const categoryRef = doc(db, 'categories', category.id);
    await updateDoc(categoryRef, category);
    return category;
  });
  
  export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
    return categoryId;
  });
  
  const catesSlice = createSlice({
    name: 'admin',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.fulfilled, (state, action) => {
            // console.log(action.payload);
          return action.payload;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
          state.push(action.payload);
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          const index = state.findIndex((cate) => cate.id === action.payload.id);
          if (index !== -1) {
            state[index] = action.payload;
          }
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          return state.filter((cate) => cate.id !== action.payload);
        });
    },
  });
  
  export default catesSlice.reducer;