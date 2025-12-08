import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '../../App';
import { CustomerService } from '../services/CustomerService';

type NavigationProps = NativeStackNavigationProp<
  CustomerStackParamList,
  'EditCustomer'
>;

type EditCustomerRouteProp = RouteProp<CustomerStackParamList, 'EditCustomer'>;

export default function EditCustomerScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<EditCustomerRouteProp>();
  const { customerId } = route.params;

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const data = await CustomerService.getCustomerById(customerId);
        setName(data.name);
        setPhone(data.phone);
      } catch (error) {
        console.log('Error fetching customer:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin khách hàng');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerId]);

  const handleSave = async () => {
    try {
      if (!name.trim() || !phone.trim()) {
        Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ tên và số điện thoại');
        return;
      }

      await CustomerService.updateCustomer(customerId, name, phone);
      Alert.alert('Thành công', 'Cập nhật khách hàng thành công');
      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      Alert.alert('Lỗi', error.message || 'Không thể cập nhật khách hàng');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e91e63" />
        </View>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.heroTitle}>Chỉnh sửa khách hàng</Text>
            <Text style={styles.heroSubtitle}>
              Cập nhật thông tin khách hàng
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>

            {/* Name */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Tên khách hàng</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên khách hàng"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Phone */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                placeholder="Ví dụ: 0123456789"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.bookingButton} onPress={handleSave}>
            <Text style={styles.bookingButtonText}>Cập nhật</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
