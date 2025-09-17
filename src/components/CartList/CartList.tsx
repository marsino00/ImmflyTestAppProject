import React, { useEffect, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCartArray } from '../../store/slices/cart.slice';
import { Dropdown } from 'react-native-element-dropdown';

import {
  setCurrency,
  setSaleType,
  loadRates,
  convert,
  type Currency,
  type SaleType,
} from '../../store/slices/catalog.slice';
import { styles } from './CartList.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';

const saleTypeLabel: Record<SaleType, string> = {
  retail: 'Retail',
  crew: 'Crew',
  happyHour: 'Happy hour',
  inviteBusiness: 'Invitación business',
  inviteTourist: 'Invitación turista',
};

const currencyLabel: Record<Currency, string> = {
  EUR: 'EUR',
  USD: 'USD',
  GBP: 'GBP',
};

export default function CartList() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const items = useAppSelector(selectCartArray);
  const { currency, rates, saleType, products } = useAppSelector(
    s => s.catalog,
  );

  const productsById = useMemo(() => {
    const map: Record<number, (typeof products)[number]> = {};
    for (const p of products) map[p.id] = p;
    return map;
  }, [products]);

  useEffect(() => {
    if (!rates) dispatch(loadRates());
  }, [rates, dispatch]);

  const totalBaseEUR = useMemo(() => {
    return items.reduce((acc, it) => {
      const p = productsById[it.id];
      const currentBase =
        p?.prices?.[saleType as keyof typeof p.prices] ?? it.baseEUR ?? 0;
      return acc + currentBase * it.qty;
    }, 0);
  }, [items, productsById, saleType]);

  const totalInCurrency = useMemo(
    () => convert(totalBaseEUR, currency, rates),
    [totalBaseEUR, currency, rates],
  );

  const otherCurrencies = useMemo<Currency[]>(() => {
    const all: Currency[] = ['EUR', 'USD', 'GBP'];
    return all.filter(c => c !== currency) as Currency[];
  }, [currency]);

  const equivalents = useMemo(
    () =>
      otherCurrencies.map(c => ({
        c,
        v: convert(totalBaseEUR, c, rates),
      })),
    [otherCurrencies, totalBaseEUR, rates],
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text>Carro vacío</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Pressable
            style={styles.payButton}
            onPress={() => {
              navigation.navigate('Ticket');
            }}
          >
            <Text style={styles.payButtonText}>
              PAGAR {totalInCurrency.toFixed(2)} {currency}
            </Text>
          </Pressable>

          <View style={styles.saleTypeWrapper}>
            <Dropdown
              placeholder="Select an option..."
              data={Object.entries(saleTypeLabel).map(([value, label]) => ({
                label,
                value,
              }))}
              labelField="label"
              valueField="value"
              style={styles.saleTypeDropdown}
              maxHeight={300}
              value={saleType}
              onChange={item => {
                dispatch(setSaleType(item.value));
              }}
              selectedTextStyle={styles.payButtonText}
            />
          </View>
        </View>

        <View style={styles.equivalentsContainer}>
          <Text>
            {equivalents
              .map(
                ({ c, v }) => `${v.toFixed(0)} ${c === 'GBP' ? 'Libras' : c}`,
              )
              .join(' | ')}
          </Text>
        </View>

        <View style={styles.currencyDropdownContainer}>
          <Dropdown
            placeholder="Select an option..."
            data={(['EUR', 'USD', 'GBP'] as Currency[]).map(c => ({
              label: currencyLabel[c],
              value: c,
            }))}
            labelField="label"
            valueField="value"
            style={styles.currencyDropdown}
            maxHeight={300}
            value={currency}
            onChange={item => {
              dispatch(setCurrency(item.value));
            }}
          />
        </View>
      </View>
    </View>
  );
}
