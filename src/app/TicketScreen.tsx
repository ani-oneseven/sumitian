import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
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

let moment = require('moment');

const TicketScreen = ({ navigation, route }: any) => {
  const [ticketData, setTicketData] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const ticket = await SecureStore.getItemAsync('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
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
      <StatusBar hidden />
      
      <View style={styles.ticketsContainer}>
      <Text>Booked For {moment(ticketData.bookedForDate).format("dddd, Do MMMM YY")}</Text>
        <Text>{moment(ticketData.bookedOnDate).fromNow()}</Text>
        <View style={styles.slotDetailsContainer}>
          {ticketData?.slot.map((item, index) => {
            return (
              <View key={index} style={styles.slotDetails}>
                <Text>{item.vodScreen}</Text>
                
                <Text>Slot {item.timeSlot}</Text>
              </View>
            )
          })}
        </View>
        <Text>Booking ID {ticketData.id}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  ticketsContainer: {
    margin: SPACING.space_10,
    padding: SPACING.space_10,
    backgroundColor: COLORS.White,
    borderRadius: SPACING.space_18,

  },
  slotDetailsContainer: {
    // margin: SPACING.space_10,
    // padding: SPACING.space_10,
    // backgroundColor: Colors.light.tint,
    // borderRadius: SPACING.space_18,
  },
  slotDetails: {
    margin: SPACING.space_10,
    padding: SPACING.space_10,
    backgroundColor: Colors.light.tint,
    borderRadius: SPACING.space_18,
  },
  vodScreen: {

  },
  vodSlot: {

  },
  vodDate: {

  },
});

export default TicketScreen;