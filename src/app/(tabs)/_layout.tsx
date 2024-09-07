import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { SPACING } from '@/theme/theme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle:{
          // marginVertical: SPACING.space_10,
          // marginHorizontal: SPACING.space_10*8,
          // borderRadius: SPACING.space_10*10,
          // backgroundColor: Colors.light.background,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/MyAccountModal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="BookVodScreen"
        options={{
          title: 'Book VOD',
          tabBarIcon: ({ color }) => <TabBarIcon name="video-camera" color={color} />,
        }}
      />
      <Tabs.Screen
        name="FeeScreen"
        options={{
          title: 'Fee',
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card" color={color} />,
        }}
      />
    </Tabs>
  );
}
