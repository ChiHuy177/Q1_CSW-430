import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export const CalculatorPage = () => {
  const [display, setDisplay] = useState('');
  const [operator, setOperator] = useState<string>('');
  const [firstValue, setFirstValue] = useState('');

  const handleNumberInput = (value: string) => {
    setDisplay(display + value);
  };

  const handleOperatorInput = (op: string) => {
    setOperator(op);
    setFirstValue(display);
    setDisplay('');
  };


  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(display);

    if (operator === '+') {
      setDisplay((num1 + num2).toString());
    } else if (operator === '-') {
      setDisplay((num1 - num2).toString());
    } else if (operator === '*') {
      setDisplay((num1 * num2).toString());
    } else if (operator === '/') {
      setDisplay((num1 / num2).toString());
    }

    setOperator('');
    setFirstValue('');
  };

  const handleClear = () => {
    setDisplay('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('1')}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('2')}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('3')}
        >
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.specialButton]}
          onPress={() => handleOperatorInput("/")}
        >
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('4')}
        >
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('5')}
        >
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('6')}
        >
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.specialButton]}
          onPress={() => handleNumberInput('*')}
        >
          <Text style={styles.buttonText} onPress={() => handleOperatorInput("*")}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('7')}
        >
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('8')}
        >
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput('9')}
        >
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.specialButton]}
          onPress={() => handleOperatorInput("-")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button0}
          onPress={() => handleNumberInput('0')}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.specialButton]}
          onPress={() => handleOperatorInput("+")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonEqual]}
          onPress={handleEqual}
        >
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonClear]} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
