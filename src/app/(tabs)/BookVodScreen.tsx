import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';

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
import { Stack } from 'expo-router';

const timesSlots: string[] = ['2:30', '3:30', '4:30', '5:30', '6:30'];

const generateDate = () => {
  const date = new Date();
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 10; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
      month: month[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getMonth()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 4;
  let numColumn = timesSlots.length;
  let rowArray = [];
  let start = 1;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        screen: 'VOD-' + (i + 1),
        number: start,
        timeSlot: timesSlots[j],
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

export default function FeeScreen() {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [slots, setSlots] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setSlots(array.length);
      setTwoDSeatArray(temp);
    }
  };

  // const BookSeats = async () => {
  //   if (
  //     selectedSeatArray.length !== 0 &&
  //     timesSlots[selectedTimeIndex] !== undefined &&
  //     dateArray[selectedDateIndex] !== undefined
  //   ) {
  //     try {
  //       await EncryptedStorage.setItem(
  //         'ticket',
  //         JSON.stringify({
  //           seatArray: selectedSeatArray,
  //           time: timesSlots[selectedTimeIndex],
  //           date: dateArray[selectedDateIndex],
  //           ticketImage: route.params.PosterImage,
  //         }),
  //       );
  //     } catch (error) {
  //       console.error(
  //         'Something went Wrong while storing in BookSeats Functions',
  //         error,
  //       );
  //     }
  //     navigation.navigate('Ticket', {
  //       seatArray: selectedSeatArray,
  //       time: timesSlots[selectedTimeIndex],
  //       date: dateArray[selectedDateIndex],
  //       ticketImage: route.params.PosterImage,
  //     });
  //   } else {
  //     ToastAndroid.showWithGravity(
  //       'Please Select Seats, Date and Time of the Show',
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //     );
  //   }
  // };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
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
        <Text style={styles.MonthText}>{dateArray[selectedDateIndex]?.month || 'Month'}</Text>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: SPACING.space_10 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                        ? { marginRight: SPACING.space_24 }
                        : {},
                    index == selectedDateIndex
                      ? { backgroundColor: Colors.light.tint }
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.OutterContainer}>
        {twoDSeatArray?.map((item, mainindex) => {
          return (
            <View key={mainindex}>
              <Text style={styles.screenNumberText}>{item[mainindex]?.screen}</Text>
              <FlatList
                data={item}
                keyExtractor={item => item.number}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.containerGap24}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => selectSeat(mainindex, index, item.number)}>
                      <View
                        style={[
                          styles.timeContainer,
                          item.number == 1
                            ? { marginLeft: SPACING.space_24 }
                            : item.number % 5 == 0
                              ? { marginRight: SPACING.space_24 }
                              : item.number % 5 == 1
                                ? { marginLeft: SPACING.space_24 }
                                : {},
                          item.taken ? { backgroundColor: Colors.light.tabIconDefault } : {},
                          item.selected ? { backgroundColor: Colors.light.tint } : {},
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
        <View style={styles.seatRadioContainer}>
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
      </View>

      <View style={styles.buttonSlotsContainer}>
        <View style={styles.slotsContainer}>
          <Text style={styles.totalSlotsText}>Total Slots</Text>
          <Text style={styles.slots}>{slots}</Text>
        </View>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.buttonText}>Book Slots</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  seatRadioContainer: {
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
    padding: SPACING.space_4,
    fontFamily: 'PoppinsMedium',
    fontSize: FONTSIZE.size_10,
    color: Colors.light.text,
    borderRadius: SPACING.space_18,
  },
  containerGap24: {
    // gap: SPACING.space_2,
  },
  OutterContainer: {
    marginVertical: SPACING.space_28,
  },
  timeContainer: {
    marginHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: Colors.light.tabIconDefault,
    paddingHorizontal: SPACING.space_20,
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
  screenNumberText: {
    marginVertical: SPACING.space_8,
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  buttonSlotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
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