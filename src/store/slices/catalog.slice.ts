import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchRates,
  type Product,
  type Rates,
} from '../../api/catalog.api';
import type { RootState } from '../index';

export const loadProducts = createAsyncThunk(
  'catalog/loadProducts',
  fetchProducts,
);
export const loadRates = createAsyncThunk('catalog/loadRates', fetchRates);

export type Currency = 'EUR' | 'USD' | 'GBP';
export type SaleType =
  | 'retail'
  | 'crew'
  | 'happyHour'
  | 'inviteBusiness'
  | 'inviteTourist';

type CatalogState = {
  products: Product[];
  loading: boolean;
  error?: string;
  rates?: Rates;
  currency: Currency;
  saleType: SaleType;
};

const initialState: CatalogState = {
  products: [],
  loading: false,
  currency: 'EUR',
  saleType: 'retail',
};

const catalog = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    clearProducts: s => {
      s.products = [];
    },
    setCurrency: (s, a: PayloadAction<Currency>) => {
      s.currency = a.payload;
    },
    setSaleType: (s, a: PayloadAction<SaleType>) => {
      s.saleType = a.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, s => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(loadProducts.fulfilled, (s, a: PayloadAction<Product[]>) => {
        s.loading = false;
        s.products = a.payload;
      })
      .addCase(loadProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })
      .addCase(loadRates.fulfilled, (s, a: PayloadAction<Rates>) => {
        s.rates = a.payload;
      });
  },
});

export const { clearProducts, setCurrency, setSaleType } = catalog.actions;
export default catalog.reducer;

export const convert = (
  amountEUR: number,
  currency: Currency,
  rates?: Rates,
) => {
  if (currency === 'EUR') return amountEUR;
  const rate = rates?.[currency] ?? 1;
  return amountEUR * rate;
};

export const selectProductDisplayPrice = (
  state: RootState,
  productId: number,
) => {
  const { products, saleType, currency, rates } = state.catalog;
  const p = products.find(x => x.id === productId);
  if (!p) return 0;
  const baseEUR = (p as any).prices?.[saleType];
  return convert(baseEUR, currency, rates);
};

export const convertTotal = (state: RootState, totalEUR: number) => {
  const { currency, rates } = state.catalog;
  return convert(totalEUR, currency, rates);
};
