import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/sign-in'} asChild>
        <Button text="Sign In" />
      </Link>
      <Link href={'(tabs)'} asChild>
        <Button text="Home" />
      </Link>
    </View>
  );
};

export default index;
