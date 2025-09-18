import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { styles } from './PaymentSplitModal.styles';

type Props = {
  visible: boolean;
  total: number;
  currency: string;
  onSelect: (split: { cash: number; card: number }) => void;
  onClose: () => void;
  type: 'cash' | 'card';
};

export default function PaymentSplitModal({
  visible,
  total,
  currency,
  onSelect,
  onClose,
  type,
}: Props) {
  const allCash = { cash: Number(total.toFixed(2)), card: 0 };
  const allCard = { cash: 0, card: Number(total.toFixed(2)) };
  const half = {
    cash: Number((total / 2).toFixed(2)),
    card: Number((total - total / 2).toFixed(2)),
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Dividir pago</Text>
          <Text style={styles.subtitle}>
            Total: {total.toFixed(2)} {currency}
          </Text>
          {type === 'cash' && (
            <Pressable
              onPress={() => onSelect(allCash)}
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>Todo en efectivo</Text>
            </Pressable>
          )}
          {type === 'card' && (
            <Pressable
              onPress={() => onSelect(allCard)}
              style={[styles.optionButton, styles.optionButtonNoMargin]}
            >
              <Text style={styles.optionButtonText}>Todo en tarjeta</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => onSelect(half)}
            style={[styles.optionButton, styles.optionButtonHalf]}
          >
            <Text style={styles.optionButtonText}>50 / 50</Text>
          </Pressable>

          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
