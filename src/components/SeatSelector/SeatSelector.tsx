import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './SeatSelector.styles';

type Props = {
  row: number;
  seat: string;
  onChange: (row: number, seat: string) => void;
  rows?: number[];
  seats?: string[];
};

export default function SeatSelector({
  row,
  seat,
  onChange,
  rows = Array.from({ length: 30 }, (_, i) => i + 1),
  seats = ['A', 'B', 'C', 'D', 'E', 'F'],
}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>ASIENTO</Text>
      <View style={styles.container}>
        <View style={styles.pickerRow}>
          <Picker
            selectedValue={seat}
            style={styles.picker}
            dropdownIconColor="transparent"
            dropdownIconRippleColor="transparent"
            onValueChange={v => onChange(row, String(v))}
          >
            {seats.map(r => (
              <Picker.Item
                style={styles.pickerItem}
                key={r}
                label={r}
                value={r}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={row}
            style={styles.picker}
            onValueChange={v => onChange(Number(v), seat)}
          >
            {rows.map(s => (
              <Picker.Item
                style={styles.pickerItem}
                key={s}
                label={String(s)}
                value={s}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}
