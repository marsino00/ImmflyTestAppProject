import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  emptyState: {
    padding: 16,
  },
  container: {
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
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
  },
  payButtonText: {
    color: 'white',
    fontWeight: '800',
  },
  saleTypeWrapper: {
    width: 180,
    position: 'relative',
  },
  saleTypeDropdown: {
    backgroundColor: '#312E81',
    paddingVertical: 12,
    paddingHorizontal: 12,
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
});
