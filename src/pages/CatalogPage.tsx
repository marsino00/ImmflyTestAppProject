import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadProducts } from '../store/slices/catalog.slice';
import CategoryAccordionList from '../components/CategoryAccordionList/CategoryAccordionList';
import CartList from '../components/CartList/CartList';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(s => s.catalog);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <CategoryAccordionList products={products} singleOpen={true} />
      <CartList />
    </View>
  );
}
