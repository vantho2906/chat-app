import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers/index';

import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: true || composeWithDevTools(),
});

export default store;
