import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useBooking } from '@/providers/BookingProvider';

let moment = require('moment');

const TicketScreen = ({ navigation, route }: any) => {
  const [ticketData, setTicketData] = useState<any>();
  const { tickets } = useBooking();

  useEffect(() => {
    (async () => {
      try {
        const ticket = await SecureStore.getItemAsync('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
          console.log(tickets);
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  // if (ticketData !== route.params && route.params != undefined) {
  //   setTicketData(route.params);
  // }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <Text>App Header Here</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>

      {
        tickets.map((ticket, index) => {
          return (
            <View key={index} style={styles.ticketsContainer}>
              <View style={styles.ticketsContainerHeader}>
                <View style={{ flexDirection: 'row'}}>
                  <FontAwesome
                    name="calendar-check-o"
                    size={18}
                    color={Colors.light.text}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={{fontSize: FONTSIZE.size_16, fontFamily: "PoppinsMedium"}}>{moment(ticket.bookedForDate).format("dddd Do MMM, YY")}</Text>
                </View>
                <Text>{moment(ticket.bookedOnDate).fromNow()}</Text>
              </View>
              <View style={styles.slotDetailsContainer}>
                <FlatList
                  data={ticket.slot}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.slotDetails}>
                        <Text style={styles.vodScreen}>{item.vodScreen}</Text>
                        <Text style={styles.vodSlot}>{item.timeSlot}</Text>
                      </View>
                    )
                  }}
                />
              </View>
              <Text style={styles.bookingId}>Booking ID {ticket.id}</Text>
            </View>
          );
        })
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.White,
  },
  ticketsContainer: {
    margin: SPACING.space_10,
    padding: SPACING.space_16,
    backgroundColor: Colors.light.tint,
    borderRadius: SPACING.space_28,

  },
  ticketsContainerHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slotDetailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // marginVertical: SPACING.space_10,
    // padding: SPACING.space_10,
    // backgroundColor: Colors.light.tint,
    // borderRadius: SPACING.space_18,
  },
  slotDetails: {
    alignItems: 'center',
    margin: SPACING.space_10,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_10,
    backgroundColor: Colors.light.background,
    borderRadius: SPACING.space_18,
  },
  vodScreen: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    fontSize: FONTSIZE.size_12,
    color: Colors.light.tabIconDefault,
  },
  vodSlot: {
    fontFamily: 'PoppinsMedium',
    fontSize: FONTSIZE.size_24,
    color: Colors.light.text,
  },
  vodDate: {

  },
  bookingId: {
    fontFamily: 'PoppinsRegular',
    fontSize: FONTSIZE.size_10,
    color: Colors.light.text,
    textAlign: 'center',
  }
});

export default TicketScreen;