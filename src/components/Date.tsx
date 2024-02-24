import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

import Colors from '@/constants/Colors';

// interface DateProps {
//   date: moment.Moment;
//   onSelectDate: (selectedDate: string) => void;
//   selected: string | null;
// }

const DateComponent = ({ date, onSelectDate, selected }) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd');
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D');

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD');

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected === fullDate && { backgroundColor: Colors.light.tint, borderRadius: 10 }]}
    >
      <Text
        style={[
          styles.medium,
          selected === fullDate && { color: Colors.light.text},
        ]}
      >
        {dayNumber}
      </Text>
      <View style={{ height: 5 }} />
      <Text
        style={[styles.big, selected === fullDate && { color: Colors.light.text }]}
      >
        {day}
      </Text>
    </TouchableOpacity>
  );
};

export default DateComponent;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    marginVertical: 10,
    alignItems: 'center',
    height: 60,
    width: 60,
  },
  big: {
    fontSize: 12,
  },
  medium: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
