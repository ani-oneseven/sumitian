import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import { Moment } from 'moment';
import { randomUUID } from 'expo-crypto';

import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import { Stack, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import TicketScreen from '../TicketScreen';
import { Slot, SlotTimming, Ticket, VodScreen } from '@/types';
import bookings from '../../../assets/data/bookings';

const timesSlots: SlotTimming[] = ['2:30', '3:30', '4:30', '5:30', '6:30'];
const vodScreens: VodScreen[] = ['VOD-1', 'VOD-2', 'VOD-3', 'VOD-4'];
const bookingsArray: Ticket[] = bookings;

let moment = require('moment');

const generateDate = () => {
  let m: Moment = moment();
  let weekdays: string[] = [];
  for (let i = 0; i < 15; i++) {
    weekdays.push(m.toISOString());
    m.add(1, 'days');
  }
  // console.log(weekdays);
  return weekdays;
};

const generateSlots = () => {
  let numRow = vodScreens.length;
  let numColumn = timesSlots.length;
  let rowArray = [];
  let start = 1;

  for (let i = 0; i < numRow; i++) {
    let columnArray: Slot[] = [];
    for (let j = 0; j < numColumn; j++) {
      let slotObject: Slot = {
        id: start.toString(),
        vodScreen: vodScreens[i],
        // bookedForDate: selectedDate,
        timeSlot: timesSlots[j],
      };
      columnArray.push(slotObject);
      start++;
    }
    rowArray.push(columnArray);
  }
  // console.log(rowArray);
  return rowArray;
};

const findTakenSlots = (bookings: Ticket[], bookedForDate: string) => {
  const takenSlots: string[] = [];

  bookings.forEach(booking => {
    if (moment(booking.bookedForDate).isSame(bookedForDate, 'day')) {
      booking.slot.forEach(slot => {
        takenSlots.push(slot.id);
     });
    }
  });
  return takenSlots;
}

export default function FeeScreen() {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [takenSlots, setTakenSlots] = useState<string[]>();
  const [slots, setSlots] = useState<number>(0);
  const [slotMatrix, setSlotMatrix] = useState<Slot[][]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string[]>([]);
  const [ticketsArray, setTicketsArray] = useState([]);

  useEffect(() => setSlotMatrix(generateSlots()), [selectedDate]);
  useEffect(() => setTakenSlots(findTakenSlots(bookingsArray, selectedDate)), [selectedDate]);
  useEffect(() => { setSelectedSlot([]); setSlots(0) }, [selectedDate]);
  useEffect(() => { setSlots(selectedSlot.length) }, [selectedSlot]);

  const selectSlot = (id: string) => {
    console.log("seletedSlot", selectedSlot, id);
    if (selectedDate) {
      selectedSlot.includes(id) ?
        setSelectedSlot(selectedSlot.filter(item => item !== id))
        : setSelectedSlot([...selectedSlot, id]);
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Date before selecting slot',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const generateTicket = (selectedDate: string, slotMatrix: Slot[][], selectedSlot: string[]) => {
    let TicketArray: Ticket = {
      id: randomUUID(),
      bookedOnDate: moment().toISOString(),
      bookedForDate: selectedDate,
      slot: []
    };
    slotMatrix.forEach(row => {
      row.forEach(slot => {
        if (selectedSlot.includes(slot.id)) {
          TicketArray.slot.push(slot);
        }
      });
    })
    console.log(TicketArray);
    return TicketArray;
  };

  const BookSlots = async (selectedDate: string, slotMatrix: Slot[][], selectedSlot: string[]) => {
    if (
      selectedSlot.length !== 0 &&
      selectedDate !== undefined
    ) {
      try {
        await SecureStore.setItemAsync(
          'ticket',
          JSON.stringify(generateTicket(selectedDate, slotMatrix, selectedSlot)),
        );
        router.push('/TicketScreen');
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSlots Functions',
          error,
        );
      }
      // navigation.navigate('Ticket', {
      //   slotArray: selectedSlot,
      //   time: timesSlots[selectedTimeIndex],
      //   date: dateArray[selectedDate],
      //   ticketImage: route.params.PosterImage,
      // });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Slots, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };



  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Book VOD',
          // headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: Colors.light.text,
          headerTitleStyle: { fontFamily: 'PoppinsBold' },
        }}
      />
      <StatusBar hidden />
      <View>
        <Text style={styles.MonthText}>{selectedDate ? moment(selectedDate).format('MMM') : 'Month'}</Text>
        <FlatList
          data={dateArray}
          keyExtractor={item => moment(item).format('D')}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: SPACING.space_10 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDate(item)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                        ? { marginRight: SPACING.space_24 }
                        : {},
                    item == selectedDate
                      ? { backgroundColor: Colors.light.tint }
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{moment(item).format('D')}</Text>
                  <Text style={styles.dayText}>{moment(item).format('ddd')}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <ScrollView
        style={styles.vodContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {slotMatrix?.map((item, mainindex) => {
          return (
            <View key={mainindex} style={styles.OutterContainer}>
              <Text style={styles.screenNumberText}>{item[mainindex]?.vodScreen}</Text>
              <FlatList
                data={item}
                // keyExtractor={item => item.number}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.containerGap24}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => selectSlot(item.id)}
                      disabled={takenSlots?.includes(item.id) ? true : false}
                    >
                      <View
                        style={[
                          styles.timeContainer,
                          Number(item.id) == 1
                            ? { marginLeft: SPACING.space_24 }
                            : Number(item.id) % 5 == 0
                              ? { marginRight: SPACING.space_24 }
                              : Number(item.id) % 5 == 1
                                ? { marginLeft: SPACING.space_24 }
                                : {},
                          takenSlots?.includes(item.id) ? { backgroundColor: Colors.light.tabIconDefault } : {},
                          selectedSlot?.includes(item.id) ? { backgroundColor: Colors.light.tint } : {},
                        ]}>
                        <Text style={styles.timeText}>{item.timeSlot}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        })}
        <View style={styles.slotRadioContainer}>
          <View style={styles.radioContainer}>
            <Text style={[styles.radioText, { borderColor: Colors.light.tabIconDefault, borderWidth: 1 }]}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <Text style={[styles.radioText, { backgroundColor: Colors.light.tabIconDefault }]}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <Text style={[styles.radioText, { backgroundColor: Colors.light.tint }]}>Selected</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonSlotsContainer}>
        <View style={styles.slotsContainer}>
          <Text style={styles.totalSlotsText}>Total Slots</Text>
          <Text style={styles.slots}>{slots}</Text>
        </View>

        <TouchableOpacity onPress={() => {
          // console.log('dateArray=', dateArray);
          // console.log('selectedDate=', dateArray[selectedDate]);
          // console.log('slots=', slots);
          // console.log('slotMatrix=', slotMatrix);
          // console.log('selectedSlot=', selectedSlot);
          // console.log('selectedTimeIndex=',selectedTimeIndex);
          // selectedSlot.map((item, index) => {
          //   console.log(slotMatrix[item].)
          // });
          BookSlots(selectedDate, slotMatrix, selectedSlot);
        }}>
          <Text style={styles.buttonText}>Book Slots</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  MonthText: {
    height: SPACING.space_28,
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: FONTSIZE.size_16,
    color: COLORS.Black,
  },
  dateContainer: {
    width: SPACING.space_10 * 6,
    height: SPACING.space_10 * 9,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'PoppinsMedium',
    fontSize: FONTSIZE.size_24,
    color: Colors.light.text,
  },
  dayText: {
    fontFamily: 'PoppinsRegular',
    fontSize: FONTSIZE.size_12,
    color: Colors.light.text,
  },
  vodContainer: {
    flex: 1,
    alignContent: 'flex-start',
  },
  containerGap24: {
    // gap: SPACING.space_2,
  },
  OutterContainer: {
    paddingVertical: SPACING.space_12,
    // marginBottom: SPACING.space_10,
  },
  screenNumberText: {
    marginBottom: SPACING.space_8,
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  timeContainer: {
    marginHorizontal: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_8,
    borderWidth: 1,
    borderColor: Colors.light.tabIconDefault,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: 'PoppinsRegular',
    fontSize: FONTSIZE.size_14,
    color: Colors.light.text,
  },
  slotRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioText: {
    width: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: SPACING.space_8,
    fontFamily: 'PoppinsMedium',
    fontSize: FONTSIZE.size_10,
    color: Colors.light.text,
    borderRadius: SPACING.space_18,
  },
  buttonSlotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    padding: SPACING.space_16,
  },
  slotsContainer: {
    alignItems: 'center',
  },
  totalSlotsText: {
    fontFamily: 'PoppinsRegular',
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  slots: {
    fontFamily: 'PoppinsMedium',
    fontSize: FONTSIZE.size_24,
    color: Colors.light.text,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: 'PoppinsSemiBold',
    fontSize: FONTSIZE.size_16,
    color: Colors.light.text,
    backgroundColor: Colors.light.tint,
  },
});