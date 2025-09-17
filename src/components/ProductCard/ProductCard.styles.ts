import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F2F2F7',
    position: 'relative',
  },
  controls: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  qtyButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonMinus: {
    marginRight: 4,
  },
  qtyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '800',
  },
  qtyBadge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    paddingHorizontal: 6,
  },
  qtyBadgeText: {
    color: 'white',
    fontWeight: '800',
  },
  image: {
    width: '100%',
    height: 150,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  productName: {
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  stockText: {
    color: '#6B7280',
    fontSize: 12,
  },
  priceBadge: {
    fontWeight: '700',
    backgroundColor: 'black',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 12,
  },
});
