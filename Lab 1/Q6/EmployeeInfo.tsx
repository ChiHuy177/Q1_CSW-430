import { useState } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';

interface EmployeeProps {
  title: string;
}

type Employee = {
  id: string;
  fullName: string;
  age: number;
  occupation: string;
  specialized: string;
};

const EmployeeInfo = ({ title }: EmployeeProps) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [specialized, setSpecialized] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  const resetForm = () => {
    setFullName('');
    setAge('');
    setOccupation('');
    setSpecialized('');
  };

  const handleUpdate = () => {
    if (!fullName || !age || !occupation || !specialized) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }
    Alert.alert('Success', 'Update successfully!');

    const newEmployee: Employee = {
      id: new Date().toISOString(),
      fullName,
      age: parseInt(age),
      occupation,
      specialized,
    };

    setEmployees([...employees, newEmployee]);
    resetForm();
  };

  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.fullName}</Text>
      <Text style={styles.cardLine}>Age: {item.age}</Text>
      <Text style={styles.cardLine}>Occupation: {item.occupation}</Text>
      <Text style={styles.cardLine}>Specialized: {item.specialized}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Occupation"
        placeholderTextColor="#999"
        value={occupation}
        onChangeText={setOccupation}
      />

      <TextInput
        style={styles.input}
        placeholder="Specialized in training"
        placeholderTextColor="#999"
        value={specialized}
        onChangeText={setSpecialized}
      />

      <Button title="Update" onPress={handleUpdate} />

      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No employees yet. Add one!</Text>
        }
        contentContainerStyle={
          employees.length === 0 && { paddingVertical: 16 }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    color: 'black',
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
  },
  card: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardLine: { fontSize: 14, marginBottom: 2 },
});

export default EmployeeInfo;
