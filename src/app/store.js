import { configureStore } from '@reduxjs/toolkit';
import authreducer from "../features/auth/authslice"
import todoreducer from "../features/todo/Todoslice"
export const store = configureStore({
  reducer: {
    auth:authreducer,
    todos:todoreducer
  },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck:false
  })
});
