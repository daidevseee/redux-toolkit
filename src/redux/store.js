import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/admin/adminSlice';
import catesReducer from '../features/admin/cateSlide';
import ClientReducer from '../features/client/clientSlice';
import CategoryReducer from '../features/client/cateSlide';
import InfoReducer from '../features/admin/infoSlide';
const store = configureStore({
  reducer: {
    todos: todosReducer,
    cates: catesReducer,
    Client:ClientReducer,
    category: CategoryReducer,
    info: InfoReducer,
    
  },
});

export default store;
