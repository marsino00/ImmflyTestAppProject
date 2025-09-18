import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButtonNoMargin: {
    marginBottom: 0,
  },
  optionButtonHalf: {
    paddingVertical: 12,
    marginTop: 4,
    marginBottom: 0,
  },
  optionButtonText: {
    color: 'white',
    fontWeight: '800',
  },
  cancelButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#4F46E5',
    fontWeight: '700',
  },
});
