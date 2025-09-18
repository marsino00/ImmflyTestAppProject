import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadProducts } from '../../store/slices/catalog.slice';
import CategoryAccordionList from '../../components/CategoryAccordionList/CategoryAccordionList';
import CartList from '../../components/CartList/CartList';
import { styles } from './CatalogPage.styles';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(s => s.catalog);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading)
    return <ActivityIndicator testID="loading-indicator" size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <CategoryAccordionList products={products} singleOpen={true} />
      <CartList />
    </View>
  );
}
