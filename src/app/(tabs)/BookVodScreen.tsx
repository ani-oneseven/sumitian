import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { Stack } from 'expo-router';

import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed';
import Calendar from '@/components/Calendar';
import ClassDetails from '@/components/ClassDetails';
import VodCards from '@/components/VodCards';

const vodScreenNameList: Array<string> = ['VOD-1', 'VOD-2', 'VOD-3'];

export default function BookVodScreen() {

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'VOD Booking',
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: Colors.light.text,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <ClassDetails />
        {vodScreenNameList.map((item, index) => (
          <React.Fragment key={index}>
            <VodCards vodScreenName={item} />
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Slots</Text>
          <Text style={styles.price}>0</Text>
        </View>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.buttonText}>Book Slot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: '80%',
  },
  buttonPriceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 15,
    elevation: 1,
    borderRadius: 10,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  price: {
    fontSize: 24,
    color: Colors.light.text,
  },
  buttonText: {
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.tint,
  },
});