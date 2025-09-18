// __tests__/pages/TicketPage.test.tsx
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import TicketPage from '../../src/pages/TicketPage/TicketPage';

const mockDispatch = jest.fn();
let mockCartArray = [
  { id: 1, qty: 2, baseEUR: 3 },
  { id: 2, qty: 1, baseEUR: 0 },
];
let mockCatalogState = {
  products: [
    { id: 1, name: 'Water', image: 'water.png', prices: { retail: 2.5 } },
    { id: 2, name: 'Coffee', image: 'coffee.png', prices: { retail: 3.0 } },
  ],
  saleType: 'retail',
  currency: 'EUR',
  rates: { EUR: 1 },
};

const setMockCartArray = (arr: typeof mockCartArray) => {
  mockCartArray = arr;
};
const setMockCatalog = (partial: Partial<typeof mockCatalogState>) => {
  mockCatalogState = { ...mockCatalogState, ...partial };
};

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const mockToastShow = jest.fn();
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: { show: (...args: any[]) => mockToastShow(...args) },
}));

jest.mock('../../src/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) =>
    selector({
      catalog: mockCatalogState,
      cart: { items: {} },
    }),
}));

const mockRemoveItem = jest.fn(payload => ({ type: 'cart/remove', payload }));
const mockIncrement = jest.fn(payload => ({ type: 'cart/increment', payload }));
const mockDecrement = jest.fn(payload => ({ type: 'cart/decrement', payload }));
const mockClear = jest.fn(() => ({ type: 'cart/clear' }));

jest.mock('../../src/store/slices/cart.slice', () => ({
  selectCartArray: jest.fn(() => mockCartArray),
  removeItem: (arg: any) => mockRemoveItem(arg),
  increment: (arg: any) => mockIncrement(arg),
  decrement: (arg: any) => mockDecrement(arg),
  clear: () => mockClear(),
}));

jest.mock('../../src/store/slices/catalog.slice', () => ({
  convert: (value: number) => value,
}));

const mockDoPay = jest.fn();
jest.mock('../../src/api/catalog.api', () => ({
  doPay: (...args: any[]) => mockDoPay(...args),
}));

jest.mock('../../src/pages/TicketPage/TicketPage.styles', () => ({
  styles: {
    screen: {},
    header: {},
    headerTitle: {},
    listContent: {},
    separator: {},
    bottomBar: {},
    seatRow: {},
    totalContainer: {},
    totalLabel: {},
    totalValue: {},
    payButtonsRow: {},
    payButton: {},
    payButtonText: {},
  },
}));

jest.mock('lucide-react-native', () => ({
  LucideCoins: () => null,
  LucideCreditCard: () => null,
}));

jest.mock('../../src/components/TicketLine/TicketLine', () => {
  const { View, Text, Pressable } = require('react-native');
  return function TicketLineMock(props: any) {
    return (
      <View testID={`ticket-line-${props.name}`}>
        <Text>{props.name}</Text>
        <Text>{props.unitPrice}</Text>
        <Text>qty:{props.qty}</Text>
        <Pressable
          testID={`open-modal-${props.name}`}
          onPress={props.onOpenModal}
        >
          <Text>open modal</Text>
        </Pressable>
        <Pressable testID={`delete-${props.name}`} onPress={props.onDelete}>
          <Text>delete</Text>
        </Pressable>
      </View>
    );
  };
});

jest.mock('../../src/components/PaymentSplitModal/PaymentSplitModal', () => {
  const { View, Text, Pressable } = require('react-native');
  return function PaymentSplitModalMock(props: any) {
    if (!props.visible) return null;
    return (
      <View testID="payment-split-modal">
        <Text testID="split-type">{props.type}</Text>
        <Text testID="split-total">{String(props.total)}</Text>
        <Text testID="split-currency">{props.currency}</Text>
        <Pressable
          testID="confirm-split"
          onPress={() => props.onSelect({ cash: 5, card: 5 })}
        >
          <Text>confirm split</Text>
        </Pressable>
        <Pressable testID="close-split" onPress={props.onClose}>
          <Text>close</Text>
        </Pressable>
      </View>
    );
  };
});

jest.mock('../../src/components/QtyModal/QtyModal', () => {
  const { View, Text, Pressable } = require('react-native');
  return function QtyModalMock(props: any) {
    if (!props.visible) return null;
    return (
      <View testID="qty-modal">
        <Text testID="qty-title">{props.title}</Text>
        <Text testID="qty-current">{String(props.qty)}</Text>
        <Pressable testID="qty-confirm-0" onPress={() => props.onConfirm(0)}>
          <Text>set 0</Text>
        </Pressable>
        <Pressable testID="qty-confirm-5" onPress={() => props.onConfirm(5)}>
          <Text>set 5</Text>
        </Pressable>
        <Pressable testID="qty-confirm-1" onPress={() => props.onConfirm(1)}>
          <Text>set 1</Text>
        </Pressable>
        <Pressable testID="qty-close" onPress={props.onClose}>
          <Text>close</Text>
        </Pressable>
      </View>
    );
  };
});

jest.mock('../../src/components/SeatSelector/SeatSelector', () => {
  const { View, Text, Pressable } = require('react-native');
  return function SeatSelectorMock(props: any) {
    return (
      <View testID="seat-selector">
        <Text>row:{props.row}</Text>
        <Text>seat:{props.seat}</Text>
        <Pressable testID="seat-change" onPress={() => props.onChange(3, 'C')}>
          <Text>change seat</Text>
        </Pressable>
      </View>
    );
  };
});

describe('TicketPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setMockCatalog({
      products: [
        { id: 1, name: 'Water', image: 'water.png', prices: { retail: 2.5 } },
        { id: 2, name: 'Coffee', image: 'coffee.png', prices: { retail: 3.0 } },
      ],
      saleType: 'retail',
      currency: 'EUR',
      rates: { EUR: 1 },
    });
    setMockCartArray([
      { id: 1, qty: 2, baseEUR: 3 },
      { id: 2, qty: 1, baseEUR: 0 },
    ]);
    mockDoPay.mockResolvedValue({ message: 'Payment OK' });
  });

  it('renders lines and calculates total', () => {
    render(<TicketPage />);
    expect(screen.getByText('Productos seleccionados')).toBeTruthy();
    expect(screen.getByTestId('ticket-line-Water')).toBeTruthy();
    expect(screen.getByTestId('ticket-line-Coffee')).toBeTruthy();
    fireEvent.press(screen.getByText('Efectivo'));
    expect(screen.getByTestId('payment-split-modal')).toBeTruthy();
    expect(screen.getByTestId('split-total').props.children).toBe('8');
    expect(screen.getByTestId('split-currency').props.children).toBe('EUR');
    expect(screen.getByTestId('split-type').props.children).toBe('cash');
  });

  it('opens card split', () => {
    render(<TicketPage />);
    fireEvent.press(screen.getByText('Tarjeta'));
    expect(screen.getByTestId('payment-split-modal')).toBeTruthy();
    expect(screen.getByTestId('split-type').props.children).toBe('card');
  });

  it('handleSplit success', async () => {
    render(<TicketPage />);
    fireEvent.press(screen.getByTestId('seat-change'));
    fireEvent.press(screen.getByText('Efectivo'));
    fireEvent.press(screen.getByTestId('confirm-split'));
    await waitFor(() => {
      expect(mockDoPay).toHaveBeenCalledTimes(1);
    });
    const payload = mockDoPay.mock.calls[0][0];
    expect(payload.items).toEqual([
      { id: 1, qty: 2 },
      { id: 2, qty: 1 },
    ]);
    expect(payload.seat).toEqual({ row: 3, seat: 'C' });
    expect(payload.split).toEqual({ cash: 5, card: 5 });
    expect(payload.currency).toBe('EUR');
    expect(mockDispatch).toHaveBeenCalledWith(mockClear());
    expect(mockToastShow).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Payment OK',
    });
    expect(mockNavigate).toHaveBeenCalledWith('Catálogo');
  });

  it('handleSplit failure', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockDoPay.mockRejectedValueOnce(new Error('KO'));
    render(<TicketPage />);
    fireEvent.press(screen.getByText('Efectivo'));
    fireEvent.press(screen.getByTestId('confirm-split'));
    await waitFor(() => {
      expect(mockDoPay).toHaveBeenCalledTimes(1);
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(mockToastShow).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error procesando el pago',
    });
    expect(mockDispatch).not.toHaveBeenCalledWith(mockClear());
    expect(mockNavigate).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('opens QtyModal and confirm 0', () => {
    render(<TicketPage />);
    fireEvent.press(screen.getByTestId('open-modal-Water'));
    expect(screen.getByTestId('qty-modal')).toBeTruthy();
    fireEvent.press(screen.getByTestId('qty-confirm-0'));
    expect(mockDispatch).toHaveBeenCalledWith(mockRemoveItem({ id: 1 }));
  });

  it('confirm greater quantity', () => {
    render(<TicketPage />);
    fireEvent.press(screen.getByTestId('open-modal-Water'));
    fireEvent.press(screen.getByTestId('qty-confirm-5'));
    const incCalls = mockDispatch.mock.calls.filter(
      c => c[0]?.type === 'cart/increment',
    );
    expect(incCalls.length).toBe(3);
    incCalls.forEach(c => {
      expect(c[0].payload).toEqual({ id: 1 });
    });
  });

  it('confirm lower quantity', () => {
    setMockCartArray([{ id: 2, qty: 3, baseEUR: 0 }]);
    render(<TicketPage />);
    fireEvent.press(screen.getByTestId('open-modal-Coffee'));
    fireEvent.press(screen.getByTestId('qty-confirm-1'));
    const decCalls = mockDispatch.mock.calls.filter(
      c => c[0]?.type === 'cart/decrement',
    );
    expect(decCalls.length).toBe(2);
    decCalls.forEach(c => {
      expect(c[0].payload).toEqual({ id: 2 });
    });
  });

  it('delete line directly', () => {
    setMockCartArray([
      { id: 1, qty: 1, baseEUR: 3 },
      { id: 2, qty: 1, baseEUR: 0 },
    ]);
    render(<TicketPage />);
    fireEvent.press(screen.getByTestId('delete-Water'));
    expect(mockDispatch).toHaveBeenCalledWith(mockRemoveItem({ id: 1 }));
  });
});
