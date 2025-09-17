import { Platform } from 'react-native';
import { API_URL } from '@env';

const BASE_URL =
  Platform.OS === 'android'
    ? API_URL.replace('localhost', '10.0.2.2')
    : API_URL;

export type Product = {
  id: number;
  name: string;
  image?: string;
  category: string;
  stock?: number;
  prices: {
    retail: number;
    crew: number;
    happyHour: number;
    inviteBusiness: number;
    inviteTourist: number;
  };
};
export type Rates = {
  base: 'EUR';
  EUR: number;
  USD: number;
  GBP: number;
};

export async function fetchRates(): Promise<Rates> {
  const res = await fetch(`${BASE_URL}/rates`);
  if (!res.ok) throw new Error('Error cargando tipos de cambio');
  return res.json();
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Error cargando productos');
  return res.json();
}
