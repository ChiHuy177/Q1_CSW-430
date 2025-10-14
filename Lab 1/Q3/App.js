import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text>You pressed the button: {count} time(s) </Text>
      <Button title='Press me' onPress={() => setCount(count+1)}></Button>
      <Text>Nguyễn Chí Huy</Text>
    </View>
  );
}

