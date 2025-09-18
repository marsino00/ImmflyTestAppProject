import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  emptyState: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderWidth: 1,
  },
  footer: {
    padding: 25,
    gap: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: '800',
  },
  saleTypeWrapper: {
    width: 150,
    position: 'relative',
  },
  saleTypeDropdown: {
    backgroundColor: '#312E81',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  equivalentsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  currencyDropdownContainer: {
    marginTop: 8,
    alignItems: 'flex-end',
    position: 'relative',
  },
  currencyDropdown: {
    padding: 10,
    minWidth: 120,
  },
  currencyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  currencyButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f7f7f7',
  },
});
