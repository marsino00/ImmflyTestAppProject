import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './slices/catalog.slice';
import cartReducer from './slices/cart.slice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
  },
  middleware: getDefault => getDefault({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
