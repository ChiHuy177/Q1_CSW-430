import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../style';

const MinOfThreeNumbers: React.FC = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [num3, setNum3] = useState<string>('');
  const [minValue, setMinValue] = useState<number | null>(null);

  const handleFindMin = () => {
    if (num1 === '' || num2 === '' || num3 === '') {
      setMinValue(null);
      return;
    }

    const n1 = Number(num1);
    const n2 = Number(num2);
    const n3 = Number(num3);

    const min = Math.min(n1, n2, n3);
    setMinValue(min);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Minimum of Three Numbers</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter third number"
        keyboardType="numeric"
        value={num3}
        onChangeText={setNum3}
      />

      <Button title="Find Minimum" onPress={handleFindMin} />

      {minValue !== null && (
        <Text style={styles.result}>Minimum number is: {minValue}</Text>
      )}
    </View>
  );
};

export default MinOfThreeNumbers;
