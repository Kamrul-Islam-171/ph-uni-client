import { configureStore } from '@reduxjs/toolkit'
// ...

import authReducer from './Auth/AuthSlice'
import { baseApi } from '../api/baseApi'

import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(persistConfig,authReducer )

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath] : baseApi.reducer, // baseApi store e connect kora lagbe
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleWares => getDefaultMiddleWares({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(baseApi.middleware) // baseApi er middleware add kora lagbe
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);