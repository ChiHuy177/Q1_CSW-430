import { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const HailstoneSequence = () => {
  const [number, setNumber] = useState('');
  const [sequence, setSequence] = useState<number[]>([]);

  const handleGenerate = () => {
    const n = Number(number);
    if (isNaN(n) || n <= 0) {
      Alert.alert('Error', 'Please enter a positive number!');
      return;
    }

    let arr: number[] = [n];
    let current = n;

    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = current * 3 + 1;
      }
      arr.push(current);
    }

    setSequence(arr);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hailstone Sequence Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a positive number"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <Button title="Generate Sequence" onPress={handleGenerate} />

      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Sequence:</Text>
        {sequence.length > 0 ? (
          <Text style={styles.resultText}>{sequence.join(' → ')}</Text>
        ) : (
          <Text style={styles.emptyText}>
            No sequence yet. Please enter a number!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    marginBottom: 15,
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#777',
  },
});

export default HailstoneSequence;
