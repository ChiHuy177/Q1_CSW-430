import { ScrollView, Text } from 'react-native';
import { styles } from './style';
import data from './data/Data';
import Square from './components/Square';
import SumLastFirstDigit from './Q6/SumFirstLastDigit';
import MinOfThreeNumbers from './Q6/MinimumOfThreeNum';

function App() {
  return (
    <ScrollView style={styles.container}>
      {/* <Text>Nguyễn Chí Huy Q4</Text>
      {data.map((item, index) => (
        <Square key={index} text={`Square ${item}`} />
      ))} */}
      <SumLastFirstDigit/>
      <MinOfThreeNumbers/>
    </ScrollView>
  );
}

export default App;
