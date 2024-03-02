import { FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { FONTSIZE, SPACING } from '@/theme/theme';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type TfeeArray = {
  id: number,
  installment: number,
  amount: number,
  paid: boolean,
  dueDate: string,
}
const feeArray: TfeeArray[] = [{
  id: 1,
  installment: 1,
  amount: 4260,
  paid: true,
  dueDate: '9 April',
}, {
  id: 2,
  installment: 2,
  amount: 4260,
  paid: true,
  dueDate: '9 June',
}, {
  id: 3,
  installment: 3,
  amount: 4260,
  paid: false,
  dueDate: '9 August',
}];
// const feeArray: string[] = ['Installment-1', 'In-2', 'In-3'];

export default function FeeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Fee Details',
          // headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: Colors.light.text,
          headerTitleStyle: { fontFamily: 'PoppinsBold' },
        }}
      />
      <Text style={styles.title}>Fee Details</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={feeArray}
        // keyExtractor={item => item.dueDate}
        bounces={false}
        contentContainerStyle={styles.feeContainer}
        showsHorizontalScrollIndicator={false}
        style={styles.feeCardContainer}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => { }}>
              <View style={[
                styles.feeCard,
                item.paid == true ? { backgroundColor: '#00A86B' } : { backgroundColor: '#FD3C4A', },
              ]}>
                <View style={styles.feeCardIcon}>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="credit-card"
                        size={50}
                        color={item.paid == true ? '#00A86B' : '#FD3C4A'}
                        style={{ opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </View>
                <View lightColor={item.paid == true ? '#00A86B' : '#FD3C4A'} >
                  <Text style={[styles.feeText, { fontSize: FONTSIZE.size_20 }]}>Installment - {item.installment}</Text>
                  <Text style={[styles.feeText,]}>{item.paid == true ? 'Paid on - ' : 'Due on - '}{item.dueDate}</Text>
                  <Text style={[styles.feeText, { fontSize: FONTSIZE.size_24 }]}>₹ {item.amount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  feeContainer: {

  },
  feeCardContainer: {
    width: '90%',
  },
  feeCard: {
    flexDirection: 'row',
    height: 150,
    margin: SPACING.space_15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: SPACING.space_40,
    // borderWidth: SPACING.space_2,
    // shadowColor: "red",
    // // elevation: 1,
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 6
  },
  feeCardIcon: {
    backgroundColor: Colors.light.background,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_28,
  },
  feeTextContainer: {
    
  },
  feeText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: FONTSIZE.size_16,
    color: Colors.light.background,
  }
});
