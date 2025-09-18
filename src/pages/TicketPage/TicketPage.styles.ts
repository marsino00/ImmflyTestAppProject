import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 25,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },

  listContent: {
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    flex: 1,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    color: '#6B7280',
    fontSize: 22,
  },
  totalValue: {
    fontSize: 50,
    fontWeight: '800',
  },
  payButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  payButton: {
    flex: 1,
    backgroundColor: '#111827',
    height: 150,
    borderRadius: 14,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});
