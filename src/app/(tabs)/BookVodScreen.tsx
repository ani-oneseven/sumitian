import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
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
  // let reachfour = false;

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
    // if (i == 3) {
    //   numColumn += 2;
    // }
    // if (numColumn < 9 && !reachfour) {
    //   numColumn += 2;
    // } else {
    //   reachfour = true;
    //   numColumn -= 2;
    // }
    rowArray.push(columnArray);
  }
  console.log(rowArray);
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

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatRow}>
                {item?.map((subitem, subindex) => {
                  return (
                    <TouchableOpacity
                      key={subitem.number}
                      onPress={() => {
                        selectSeat(index, subindex, subitem.number);
                      }}>
                      <FontAwesome
                        name="circle"
                        style={[
                          styles.seatIcon,
                          subitem.taken ? { color: Colors.light.tabIconDefault } : {},
                          subitem.selected ? { color: Colors.light.tint } : {},
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <FontAwesome
              name="circle"
              style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <FontAwesome
              name="circle"
              style={[styles.radioIcon, { color: Colors.light.tabIconDefault }]}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <FontAwesome
              name="circle"
              style={[styles.radioIcon, { color: Colors.light.tint }]}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View style={styles.OutterContainer}>
        <Text style={styles.screenNumberText}>VOD-1</Text>
        <FlatList
          data={timesSlots}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                        ? { marginRight: SPACING.space_24 }
                        : {},
                    index == selectedTimeIndex
                      ? { backgroundColor: Colors.light.tint }
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
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
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    borderColor: Colors.light.tabIconDefault,
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
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: Colors.light.text,
  },
  radioText: {
    fontFamily: 'PoppinsMedium',
    fontSize: FONTSIZE.size_12,
    color: Colors.light.text,
  },
  containerGap24: {
    // gap: SPACING.space_2,
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