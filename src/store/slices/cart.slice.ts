import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../api/catalog.api';
import { RootState } from '..';
import { convert, type SaleType } from './catalog.slice';

export type CartLine = {
  id: number;
  name: string;
  baseEUR: number;
  qty: number;
};

type CartState = {
  items: Record<number, CartLine>;
};

const initialState: CartState = { items: {} };

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{ product: Product; saleType: SaleType }>,
    ) {
      const { product, saleType } = action.payload;
      const baseEUR = product.prices[saleType];
      const existing = state.items[product.id];

      if (existing) {
        existing.qty += 1;
      } else {
        state.items[product.id] = {
          id: product.id,
          name: product.name,
          baseEUR,
          qty: 1,
        };
      }
    },
    increment(state, action: PayloadAction<{ id: number }>) {
      const it = state.items[action.payload.id];
      if (it) it.qty += 1;
    },
    decrement(state, action: PayloadAction<{ id: number }>) {
      const it = state.items[action.payload.id];
      if (!it) return;
      it.qty -= 1;
      if (it.qty <= 0) delete state.items[it.id];
    },
    removeItem(state, action: PayloadAction<{ id: number }>) {
      delete state.items[action.payload.id];
    },
    clear(state) {
      state.items = {};
    },
  },
});

export const { addItem, increment, decrement, removeItem, clear } =
  cart.actions;
export default cart.reducer;

export const selectCartArray = (s: { cart: CartState }) =>
  Object.values(s.cart.items);

export const selectCartCount = (s: { cart: CartState }) =>
  //acc=acumulator, it=item
  //Cada vez suma la cantidad del item al acumulador, empezando en 0
  Object.values(s.cart.items).reduce((acc, it) => acc + it.qty, 0);

export const selectCartTotal = (s: RootState) => {
  const { currency, rates } = s.catalog;
  return Object.values(s.cart.items).reduce(
    //Cada vez suma el acumulador + el precio convertido del item
    (acc, it) => acc + convert(it.baseEUR * it.qty, currency, rates),
    0,
  );
};
