// @ts-nocheck
// middleware.js
const serializableMiddleware = store => next => action => {
  const serializableAction = { ...action };
  // Remove non-serializable values or perform serialization logic
  delete serializableAction.register;
  next(serializableAction);
};



// store.js
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../features/slices/contactSlice';
import {
  persistStore,
  persistReducer,
   FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
