import { ScrollView, Text } from 'react-native';
import { styles } from './style';
import data from './data/Data';
import Square from './components/Square';

function App() {
  return (
    <ScrollView style={styles.container}>
      <Text>Nguyễn Chí Huy Q4</Text>
      {data.map((item, index) => (
        <Square key={index} text={`Square ${item}`} />
      ))}
    </ScrollView>
  );
}

export default App;
