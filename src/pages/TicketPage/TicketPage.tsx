import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LucideCoins, LucideCreditCard } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

import QtyModal from '../../components/QtyModal/QtyModal';
import SeatSelector from '../../components/SeatSelector/SeatSelector';
import TicketLine from '../../components/TicketLine/TicketLine';
import PaymentSplitModal from '../../components/PaymentSplitModal/PaymentSplitModal';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectCartArray,
  removeItem,
  increment,
  decrement,
  clear,
} from '../../store/slices/cart.slice';
import { convert } from '../../store/slices/catalog.slice';
import { doPay } from '../../api/catalog.api';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { styles } from './TicketPage.styles';

const ItemSeparator = () => <View style={styles.separator} />;

export default function TicketPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const items = useAppSelector(selectCartArray);
  const { products, saleType, currency, rates } = useAppSelector(
    s => s.catalog,
  );

  const [row, setRow] = useState(1);
  const [seat, setSeat] = useState('A');
  const [splitVisible, setSplitVisible] = useState(false);
  const [modalForId, setModalForId] = useState<number | null>(null);
  const [splitType, setSplitType] = useState<'cash' | 'card'>('cash');

  const productsById = useMemo(
    () => Object.fromEntries(products.map(p => [p.id, p])),
    [products],
  );

  const totalBaseEUR = useMemo(() => {
    return items.reduce((acc, it) => {
      const p = productsById[it.id];
      const unit =
        p?.prices?.[saleType as keyof typeof p.prices] ?? it.baseEUR ?? 0;
      return acc + unit * it.qty;
    }, 0);
  }, [items, productsById, saleType]);

  const totalDisplay = useMemo(
    () => convert(totalBaseEUR, currency, rates),
    [totalBaseEUR, currency, rates],
  );

  const openFor = (id: number) => setModalForId(id);
  const closeModal = () => setModalForId(null);

  const openSplit = (type: 'cash' | 'card') => {
    setSplitType(type);
    setSplitVisible(true);
  };

  const handleSplit = async (res: { cash: number; card: number }) => {
    try {
      const payload = {
        items: items.map(it => ({ id: it.id, qty: it.qty })),
        seat: { row, seat },
        split: res,
        currency,
      };

      const result = await doPay(payload);
      dispatch(clear());
      setSplitVisible(false);
      Toast.show({
        type: 'success',
        text1: result.message,
        position: 'bottom',
      });
      navigation.navigate('Catálogo');
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Error procesando el pago',
        position: 'bottom',
      });
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const p = productsById[item.id];
    const unitEUR = p?.prices?.[saleType as keyof typeof p.prices] ?? 0;
    const unitDisplay =
      convert(unitEUR, currency, rates).toFixed(2) + ` ${currency}`;

    return (
      <TicketLine
        name={p?.name ?? String(item.id)}
        unitPrice={unitDisplay}
        qty={item.qty}
        onOpenModal={() => openFor(item.id)}
        onDelete={() => dispatch(removeItem({ id: item.id }))}
        imageUrl={p?.image}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos seleccionados</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={it => String(it.id)}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
      />

      {items.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.seatRow}>
            <SeatSelector
              row={row}
              seat={seat}
              onChange={(r, s) => {
                setRow(r);
                setSeat(s);
              }}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>{totalDisplay.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.payButtonsRow}>
            <Pressable
              style={styles.payButton}
              onPress={() => openSplit('cash')}
            >
              <LucideCoins color="white" size={56} />
              <Text style={styles.payButtonText}>Efectivo</Text>
            </Pressable>

            <Pressable
              style={styles.payButton}
              onPress={() => openSplit('card')}
            >
              <LucideCreditCard color="white" size={56} />
              <Text style={styles.payButtonText}>Tarjeta</Text>
            </Pressable>
          </View>
        </View>
      )}

      <PaymentSplitModal
        visible={splitVisible}
        total={Number(totalDisplay.toFixed(2))}
        currency={currency}
        onSelect={handleSplit}
        onClose={() => setSplitVisible(false)}
        type={splitType}
      />

      {modalForId != null && (
        <QtyModal
          visible={modalForId != null}
          title={productsById[modalForId!]?.name}
          qty={items.find(i => i.id === modalForId)?.qty ?? 0}
          onConfirm={newQty => {
            if (newQty === 0) {
              dispatch(removeItem({ id: modalForId! }));
            } else {
              const current = items.find(i => i.id === modalForId);
              if (current && newQty > current.qty) {
                for (let k = 0; k < newQty - current.qty; k++) {
                  dispatch(increment({ id: modalForId! }));
                }
              } else if (current && newQty < current.qty) {
                for (let k = 0; k < current.qty - newQty; k++) {
                  dispatch(decrement({ id: modalForId! }));
                }
              }
            }
          }}
          onClose={closeModal}
        />
      )}
    </View>
  );
}
