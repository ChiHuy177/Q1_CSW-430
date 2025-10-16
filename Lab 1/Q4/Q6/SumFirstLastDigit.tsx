import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { styles } from '../style';

const SumLastFirstDigit: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [sum, setSum] = useState<number | null>(null);

  const hadleCalculate = () => {
    if (number.trim() === '' || isNaN(Number(number))) {
      setSum(null);
      return;
    }

    let num = Math.abs(Number(number)); 
    const lastDigit = num % 10;

    while (num >= 10) {
      num = Math.floor(num / 10);
    }
    const firstDigit = num;

    setSum(firstDigit + lastDigit);
  };

  return (
    <View>
      <Text style={styles.title}>Sum first and last digit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a number"
        value={number}
        keyboardType="numeric"
        onChangeText={setNumber}
      />
      <Button title="Calculate" onPress={hadleCalculate} />

      {sum !== null && <Text style={styles.result}>Sum: {sum}</Text>}
    </View>
  );
};

export default SumLastFirstDigit;
