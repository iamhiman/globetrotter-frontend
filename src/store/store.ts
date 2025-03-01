import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { globetrotterApi } from './globetrotterApi';

export const store = configureStore({
  reducer: {
    [globetrotterApi.reducerPath]: globetrotterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(globetrotterApi.middleware),
});

// Enable refetch on focus
setupListeners(store.dispatch);

// Type support for `useSelector` and `useDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
