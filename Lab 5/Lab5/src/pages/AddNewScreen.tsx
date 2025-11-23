import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../../App';
import { SpaService } from '../services/SpaService';

type NavigationProps = NativeStackNavigationProp<
  ServicesStackParamList,
  'ServiceDetail'
>;

export default function CreateServiceScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = async () => {
    try {
      if (!name.trim() || !price.trim()) {
        Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ tên và giá dịch vụ');
        return;
      }

      const numericPrice = Number(price.replace(/\./g, '').replace(/,/g, ''));
      if (isNaN(numericPrice) || numericPrice <= 0) {
        Alert.alert('Thông báo', 'Giá dịch vụ không hợp lệ');
        return;
      }

      console.log('New service:', {
        name,
        price: numericPrice,
      });
      const response = await SpaService.createNewService(name, numericPrice);
      Alert.alert('Thành công', response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom']}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Thêm dịch vụ mới</Text>
            <Text style={styles.heroSubtitle}>
              Nhập thông tin cơ bản của dịch vụ
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Thông tin dịch vụ</Text>

            {/* Name */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Tên dịch vụ</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên dịch vụ"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Price */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Giá dịch vụ (VND)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ví dụ: 300000"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.bookingButton} onPress={handleSave}>
            <Text style={styles.bookingButtonText}>Lưu dịch vụ</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroSection: {
    backgroundColor: '#e91e63',
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  heroSubtitle: {
    color: '#ffe6f0',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: -20,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    color: '#636e72',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#2d3436',
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
