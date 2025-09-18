import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from './ProductCard.styles';
import { Product } from '../../api/catalog.api';

type Props = {
  product: Product;
  price: number;
  qty: number;
  onAdd: (p: Product) => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function ProductCard({
  product,
  price,
  qty,
  onAdd,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <Pressable onPress={() => onAdd(product)} style={styles.card}>
      {qty > 0 && (
        <View style={styles.controls}>
          <Pressable
            onPress={onDecrement}
            style={[styles.qtyButton, styles.qtyButtonMinus]}
          >
            <Text style={styles.qtyText}>−</Text>
          </Pressable>

          <View style={styles.qtyBadge}>
            <Text style={styles.qtyBadgeText}>{qty}</Text>
          </View>

          <Pressable onPress={onIncrement} style={styles.qtyButton}>
            <Text style={styles.qtyText}>＋</Text>
          </Pressable>
        </View>
      )}

      <Image
        source={{ uri: product.image || 'https://picsum.photos/seed/p/200' }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.stockText}>{product.stock ?? 0} unidades</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.priceBadge}>{price.toFixed(2)} €</Text>
        </View>
      </View>
    </Pressable>
  );
}
