import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  swipeAction: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  swipeActionText: {
    color: 'white',
    fontWeight: '800',
  },
  lineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontWeight: '600',
  },
  unitPrice: {
    minWidth: 90,
    textAlign: 'right',
    fontWeight: '600',
    color: '#1F2937',
    paddingRight: 20,
  },
  qty: {
    minWidth: 28,
    textAlign: 'center',
    fontWeight: '700',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
});
