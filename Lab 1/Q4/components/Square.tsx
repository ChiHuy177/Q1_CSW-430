import { Alert, Button, Text, View } from 'react-native';
import { styles } from '../style';

const Square = ({ text }: { text: string }) => {
  const ClickOnSquare = (value: string) => {
    Alert.alert(value);
  };
  return (
    <View style={[styles.box, { backgroundColor: '#7ce0f9' }]}>
      <Text>{text}</Text>
      <Button title="Click" onPress={() => ClickOnSquare(text)} />
    </View>
  );
};
export default Square;
