import React from 'react';
import { Text, Pressable, Image, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { styles } from './TicketLine.styles';

type Props = {
  name: string;
  unitPrice: string;
  qty: number;
  onOpenModal: () => void;
  onDelete: () => void;
  imageUrl?: string;
};

export default function TicketLine({
  name,
  unitPrice,
  qty,
  onOpenModal,
  onDelete,
  imageUrl,
}: Props) {
  const renderRight = () => (
    <Pressable onPress={onDelete} style={styles.swipeAction}>
      <Text style={styles.swipeActionText}>Eliminar</Text>
    </Pressable>
  );

  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRight}
    >
      <Pressable onPress={onOpenModal} style={styles.lineButton}>
        <Image
          source={{ uri: imageUrl || 'https://picsum.photos/seed/p/200' }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </View>

        <Text style={styles.unitPrice}>{unitPrice}</Text>
        <Text style={styles.qty}>{qty}</Text>
      </Pressable>
    </Swipeable>
  );
}
