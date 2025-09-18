import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../api/catalog.api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItem, increment, decrement } from '../../store/slices/cart.slice';
import { convert } from '../../store/slices/catalog.slice';
import { styles } from './CategoryAccordionList.styles';

type Props = {
  products: Product[];
  singleOpen?: boolean;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CategoryAccordionList({
  products,
  singleOpen = false,
}: Props) {
  const dispatch = useAppDispatch();
  const { saleType, currency, rates } = useAppSelector(s => s.catalog);
  const cartMap = useAppSelector(s => s.cart.items);

  const [open, setOpen] = useState<Set<string>>(new Set());

  const sections = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of products) {
      const key = p.category || 'Otros';
      const arr = map.get(key) ?? [];
      arr.push(p);
      map.set(key, arr);
    }
    return Array.from(map, ([title, data]) => ({ title, data }));
  }, [products]);

  const toggle = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else {
        if (singleOpen) next.clear();
        next.add(title);
      }
      return next;
    });
  };

  const handleIncrement = (item: Product) => {
    if (!cartMap[item.id]) {
      dispatch(addItem({ product: item, saleType }));
    } else {
      dispatch(increment({ id: item.id }));
    }
  };

  const handleDecrement = (itemId: number) => {
    dispatch(decrement({ id: itemId }));
  };

  const handleAdd = (product: Product) => {
    dispatch(addItem({ product, saleType }));
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const baseEUR = item.prices?.[saleType as keyof typeof item.prices] ?? 0;
    const price = convert(baseEUR, currency, rates);
    const qty = cartMap[item.id]?.qty ?? 0;

    return (
      <ProductCard
        product={item}
        price={price}
        qty={qty}
        onAdd={() => handleAdd(item)}
        onIncrement={() => handleIncrement(item)}
        onDecrement={() => handleDecrement(item.id)}
      />
    );
  };

  return (
    <View testID="category-accordion-list" style={styles.container}>
      {sections.map(section => {
        const isOpen = open.has(section.title);

        return (
          <View key={section.title} style={styles.section}>
            <Pressable
              onPress={() => toggle(section.title)}
              style={styles.sectionHeader}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionIcon}>{isOpen ? '✕' : '›'}</Text>
            </Pressable>

            {isOpen && (
              <FlatList
                data={section.data}
                keyExtractor={item => String(item.id)}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                scrollEnabled={false}
                renderItem={renderProduct}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
