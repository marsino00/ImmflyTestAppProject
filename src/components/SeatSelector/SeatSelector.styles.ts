import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    gap: 10,
  },
  container: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 22,
    color: '#6B7280',
    marginTop: 6,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 4,
  },
  picker: {
    width: 100,
    height: '100%',
  },
  pickerItem: {
    fontWeight: '900',
    fontSize: 28,
  },
});
