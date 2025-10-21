import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/question3_login/Login';
import { IncomeTaxPage } from './src/question4_incomeTax/IncomeTax';
import { CalculatorPage } from './src/question5_calculator/CalculatorPage';

function App() {
  return (
    <SafeAreaProvider>
      {/* <LoginScreen /> */}
      {/* <IncomeTaxPage/> */}
      <CalculatorPage/>
    </SafeAreaProvider>
  );
}

export default App;
