import { ScrollView, Text } from 'react-native';
import { styles } from './style';
import data from './data/Data';
import Square from './components/Square';
import SumLastFirstDigit from './Q6/SumFirstLastDigit';
import MinOfThreeNumbers from './Q6/MinimumOfThreeNum';
import EmployeeInfo from './Q6/EmployeeInfo';
import HailstoneSequence from './Q6/HailstoneSequence';

function App() {
  return (
    <ScrollView style={styles.container}>
      {/* <Text>Nguyễn Chí Huy Q4</Text>
      {data.map((item, index) => (
        <Square key={index} text={`Square ${item}`} />
      ))} */}
      {/* <SumLastFirstDigit /> */}
      {/* <MinOfThreeNumbers /> */}
      {/* <Text style={styles.title}>Q6 - Employee Info</Text>
      <EmployeeInfo title="Employee Information Form" /> */}
      <HailstoneSequence />
    </ScrollView>
  );
}

export default App;
