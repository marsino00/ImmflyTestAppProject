import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { styles } from './QtyModal.styles';

type Props = {
  visible: boolean;
  title?: string;
  qty: number;
  onConfirm: (newQty: number) => void;
  onClose: () => void;
};

export default function QtyModal({
  visible,
  title,
  qty,
  onConfirm,
  onClose,
}: Props) {
  const [draftQty, setDraftQty] = useState(qty);

  useEffect(() => {
    if (visible) setDraftQty(qty);
  }, [visible, qty]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.controls}>
            <Pressable
              onPress={() => setDraftQty(Math.max(0, draftQty - 1))}
              style={[styles.circleButton, styles.incrementButton]}
            >
              <Text style={styles.circleButtonText}>−</Text>
            </Pressable>

            <Text style={styles.qtyText}>{draftQty}</Text>

            <Pressable
              onPress={() => setDraftQty(draftQty + 1)}
              style={[styles.circleButton, styles.incrementButton]}
            >
              <Text style={styles.circleButtonText}>＋</Text>
            </Pressable>
          </View>

          <View style={styles.actionsRow}>
            <Pressable onPress={onClose} style={[styles.closeButton]}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onConfirm(draftQty);
                onClose();
              }}
              style={[styles.closeButton]}
            >
              <Text style={[styles.acceptButton]}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
