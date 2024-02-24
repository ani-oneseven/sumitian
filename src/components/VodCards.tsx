import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

import { Text, View } from './Themed';
import Colors from '@/constants/Colors';

// Define the prop types
type VodCardsProps = {
  vodScreenName: string; // Prop for VOD screen name
};

const TimesSlots: Array<string> = ['1:30', '2:30', '3:30', '4:30', '5:30', '6:30'];

const VodCards: React.FC<VodCardsProps> = ({ vodScreenName }) => {
  const [activeTimesSlot, setActiveTimesSlot] = useState<string | undefined>();

  const tabStyle = (activeTimesSlot: string | undefined, item: string): ViewStyle => ({
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: activeTimesSlot === item ? Colors.light.tabIconSelected : Colors.light.tabIconDefault,
  });

  const tabTextStyle = (activeTimesSlot: string | undefined, item: string): TextStyle => ({
    color: activeTimesSlot === item ? Colors.light.tabIconSelected : Colors.light.text,
  });

  return (
    <View style={styles.container}>
      <View><Text style={styles.title}>{vodScreenName}</Text></View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={TimesSlots}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tabStyle(activeTimesSlot, item)}
              onPress={() => {
                setActiveTimesSlot(item);
              }}
            >
              <Text style={tabTextStyle(activeTimesSlot, item)}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ flexDirection: 'row', columnGap: 12 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default VodCards;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
  },
  tabsContainer: {
    // width: "100%",
    marginTop: 16,
  },
});
