/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '../../App';
import { CustomerService } from '../services/CustomerService';

export interface Customer {
  _id: string;
  phone: string;
  name: string;
  loyalty: string;
  totalSpent: number;
  createdAt: string;
  createBy: string;
  updatedAt: string;
  updateBy: string;
}

type NavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  'AddNewCustomer'
>;

export default function CustomersScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await CustomerService.getAllCustomers();
        setCustomers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KAMI SPA</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Services Section */}
          <View style={styles.servicesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Dịch vụ có sẵn</Text>
              <View style={{ marginRight: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddNewCustomer');
                  }}
                  style={{
                    backgroundColor: '#007AFF',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 50,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>
                    Thêm khách hàng mới
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.countBadge}>
                <Text style={styles.countText}>{customers.length}</Text>
              </View>
            </View>

            {customers.map((customer, index) => (
              <View style={styles.serviceCard} key={index}>
                <View style={styles.serviceContent}>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>
                      Tên khách hàng: {customer.name}
                    </Text>
                    <Text style={styles.serviceName}>
                      Số điện thoại: {customer.phone}
                    </Text>
                    <Text style={styles.servicePrice}>
                      Tổng chi tiêu:{' '}
                      {customer.totalSpent.toLocaleString('vi-VN')}đ
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  welcomeCard: {
    backgroundColor: '#667eea',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginTop: 4,
  },
  servicesSection: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    flex: 1,
  },
  countBadge: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '500',
    marginBottom: 6,
  },
  servicePrice: {
    fontSize: 18,
    color: '#e91e63',
    fontWeight: 'bold',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: '#636e72',
  },
});
