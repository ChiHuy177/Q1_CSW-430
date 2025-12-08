/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TransactionStackParamList } from '../../App';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { CustomerService } from '../services/CustomerService';
import { SpaService } from '../services/SpaService';
import { TransactionService } from '../services/TransactionService';
import { Customer } from './CustomerScreen';
import { Service } from './ServiceScreen';

type NavigationProps = NativeStackNavigationProp<
  TransactionStackParamList,
  'AddTransaction'
>;

interface ServiceWithQuantity extends Service {
  selected: boolean;
  quantity: number;
}

export default function AddTransactionScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<ServiceWithQuantity[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customersData, servicesData] = await Promise.all([
          CustomerService.getAllCustomers(),
          SpaService.getAllServices(),
        ]);

        setCustomers(customersData);
        setServices(
          servicesData.map(service => ({
            ...service,
            selected: false,
            quantity: 1,
          })),
        );
      } catch (error) {
        console.log('Error:', error);
        Alert.alert('Lỗi', 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleService = (serviceId: string) => {
    setServices(prev =>
      prev.map(s =>
        s._id === serviceId ? { ...s, selected: !s.selected } : s,
      ),
    );
  };

  const updateQuantity = (serviceId: string, quantity: string) => {
    const num = parseInt(quantity) || 1;
    setServices(prev =>
      prev.map(s =>
        s._id === serviceId ? { ...s, quantity: Math.max(1, num) } : s,
      ),
    );
  };

  const calculateTotal = () => {
    return services
      .filter(s => s.selected)
      .reduce((sum, s) => sum + s.price * s.quantity, 0);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedCustomerId) {
        Alert.alert('Thông báo', 'Vui lòng chọn khách hàng');
        return;
      }

      const selectedServices = services.filter(s => s.selected);
      if (selectedServices.length === 0) {
        Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một dịch vụ');
        return;
      }

      const servicesData = selectedServices.map(s => ({
        _id: s._id,
        quantity: s.quantity,
        userId: selectedCustomerId,
      }));

      console.log(servicesData);

      await TransactionService.createNewTransaction(
        selectedCustomerId,
        servicesData,
      );

      Alert.alert('Thành công', 'Tạo giao dịch thành công', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.log(error);
      Alert.alert('Lỗi', error.message || 'Không thể tạo giao dịch');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e91e63" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />

      <ScrollView style={styles.content}>
        {/* Customer Dropdown */}
        <Text style={styles.label}>Khách hàng</Text>
        <Dropdown
          data={customers.map(c => ({ label: c.name, value: c._id }))}
          labelField="label"
          valueField="value"
          placeholder="Chọn khách hàng"
          value={selectedCustomerId}
          onChange={item => setSelectedCustomerId(item.value)}
          style={styles.dropdown}
        />

        {/* Services */}
        <Text style={[styles.label, { marginTop: 20 }]}>Dịch vụ</Text>
        {services.map(service => (
          <View key={service._id} style={styles.serviceItem}>
            {/* Dòng 1: Checkbox + Tên */}
            <View style={styles.serviceHeader}>
              <BouncyCheckbox
                size={25}
                fillColor="#e91e63"
                iconStyle={{ borderColor: '#e91e63' }}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={service.selected}
                onPress={() => toggleService(service._id)}
                disableText={true}
              />
              <Text style={styles.serviceName}>{service.name}</Text>
            </View>

            {/* Dòng 2: Giá + Quantity */}
            <View style={styles.servicePriceRow}>
              <Text style={styles.price}>
                {service.price.toLocaleString('vi-VN')}đ
              </Text>
              {service.selected && (
                <View style={styles.quantityBox}>
                  <Text style={styles.qtyLabel}>SL:</Text>
                  <TextInput
                    style={styles.qtyInput}
                    keyboardType="numeric"
                    value={String(service.quantity)}
                    onChangeText={text => updateQuantity(service._id, text)}
                  />
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Tạo giao dịch</Text>
          <Text style={styles.submitPrice}>
            {calculateTotal().toLocaleString('vi-VN')}đ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  submitPrice: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#e91e63',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    color: '#fff',
    fontSize: 28,
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: '#2d3436',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  serviceItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    color: '#2d3436',
    marginLeft: 8,
    flex: 1,
  },
  servicePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 35,
  },
  checkboxText: {
    fontSize: 16,
    color: '#2d3436',
    textDecorationLine: 'none',
  },
  serviceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: '600',
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyLabel: {
    fontSize: 14,
    color: '#636e72',
    marginRight: 5,
  },
  qtyInput: {
    width: 50,
    height: 36,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: '#fff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e91e63',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
