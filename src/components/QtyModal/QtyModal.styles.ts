import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementButton: {
    backgroundColor: '#111827',
  },
  incrementButton: {
    backgroundColor: '#4F46E5',
  },
  circleButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 15,
  },
  qtyText: {
    fontSize: 22,
    fontWeight: '800',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    fontWeight: '700',
    color: '#4B5563',
  },
  acceptButton: {
    backgroundColor: '#4F46E5',
    color: 'white',
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});
