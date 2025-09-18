import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CatalogPage from '../../src/pages/CatalogPage/CatalogPage';

jest.mock(
  '../../src/components/CategoryAccordionList/CategoryAccordionList',
  () => {
    const { View } = require('react-native');
    return function MockCategoryAccordionList() {
      return <View testID="mock-category-accordion-list" />;
    };
  },
);

jest.mock('../../src/components/CartList/CartList', () => {
  const { View } = require('react-native');
  return function MockCartList() {
    return <View testID="mock-cart-list" />;
  };
});

type CatalogSlice = {
  products: any[];
  loading: boolean;
  error: string | null;
};

let mockCatalogState: CatalogSlice = {
  products: [],
  loading: false,
  error: null,
};

const setMockCatalogState = (partial: Partial<CatalogSlice>) => {
  mockCatalogState = { ...mockCatalogState, ...partial };
};

const mockDispatch = jest.fn();

jest.mock('../../src/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) =>
    selector({
      catalog: mockCatalogState,
      cart: { items: {} },
    }),
}));

const loadProductsAction = { type: 'catalog/loadProducts' };
jest.mock('../../src/store/slices/catalog.slice', () => ({
  loadProducts: jest.fn(() => loadProductsAction),
}));

jest.mock('../../src/pages/CatalogPage/CatalogPage.styles', () => ({
  styles: { container: {} },
}));

describe('CatalogPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setMockCatalogState({ products: [], loading: false, error: null });
  });

  it('should dispatch loadProducts on mount', () => {
    render(<CatalogPage />);
    const { loadProducts } = require('../../src/store/slices/catalog.slice');
    expect(loadProducts).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(loadProductsAction);
  });

  it('should show ActivityIndicator when loading is true', () => {
    setMockCatalogState({ loading: true });
    render(<CatalogPage />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should show error message when error is not null', () => {
    setMockCatalogState({ error: 'Failed to load' });
    render(<CatalogPage />);
    expect(screen.getByText(/Error: Failed to load/i)).toBeTruthy();
  });

  it('should render CategoryAccordionList and CartList when data is loaded without errors', () => {
    setMockCatalogState({
      products: [{ id: 1, name: 'P1', category: 'Drinks', prices: {} }],
      loading: false,
      error: null,
    });
    const { toJSON } = render(<CatalogPage />);
    expect(screen.queryByTestId('loading-indicator')).toBeNull();
    expect(screen.queryByText(/Error:/)).toBeNull();
    expect(screen.getByTestId('mock-category-accordion-list')).toBeTruthy();
    expect(screen.getByTestId('mock-cart-list')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
