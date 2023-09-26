import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import {db} from '../../Service/firebase'

export const fetchinfos = createAsyncThunk('infoweb/fetchinfos', async () => {
    const infoRef = collection(db, 'infoweb');
    const snapshot = await getDocs(infoRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  export const updateInfo = createAsyncThunk('infoweb/updateInfo', async (info) => {
    const infoRef = doc(db, 'infoweb', info.id);
    await updateDoc(infoRef, info);
    return info;
  });
  
  const infosSlice = createSlice({
    name: 'admin',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchinfos.fulfilled, (state, action) => {
            // console.log(action.payload);
          return action.payload;
        })
        .addCase(updateInfo.fulfilled, (state, action) => {
          const index = state.findIndex((info) => info.id === action.payload.id);
          if (index !== -1) {
            state[index] = action.payload;
          }
        })
    },
  });
  
  export default infosSlice.reducer;