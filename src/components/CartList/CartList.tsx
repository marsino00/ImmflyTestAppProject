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

export default function CartList() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const items = useAppSelector(selectCartArray);
  const { currency, rates, saleType, products } = useAppSelector(
    s => s.catalog,
  );

  const productsById = useMemo(() => {
    //assignar el id como key para acceder mas rapido
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
      //Busca el precio segun el saleType
      //Si no lo encuentra, usa el baseEUR del item (por si acaso)
      //Si no lo encuentra, usa 0 por no romper
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
    //Calcula los equivalentes en otras monedas para mostrarlo en los botones
    () =>
      otherCurrencies.map(curr => ({
        curr: curr,
        value: convert(totalBaseEUR, curr, rates),
      })),
    [otherCurrencies, totalBaseEUR, rates],
  );

  if (items.length === 0) {
    return <View />;
  }

  return (
    <View testID="cart-list" style={styles.container}>
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
              dropdownPosition="top"
              value={saleType}
              onChange={item => {
                dispatch(setSaleType(item.value));
              }}
              selectedTextStyle={styles.payButtonText}
            />
          </View>
        </View>

        <View style={styles.currencyContainer}>
          {equivalents.map(({ curr, value }) => {
            const label = `${value.toFixed(0)} ${
              curr === 'GBP' ? 'Libras' : curr
            }`;
            const isSelected = curr === currency;

            return (
              <Pressable
                key={curr}
                onPress={() => dispatch(setCurrency(curr))}
                accessibilityRole="button"
                accessibilityLabel={`Change currency to ${curr}`}
                style={[
                  styles.currencyButton,
                  isSelected && styles.currencyButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.currencyButtonText,
                    isSelected && styles.currencyButtonTextSelected,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
