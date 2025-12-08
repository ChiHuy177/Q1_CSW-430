/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '../../App';
import { Customer } from './CustomerScreen';
import { Transaction } from './TransactionScreen';
import { CustomerService } from '../services/CustomerService';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

export interface CustomerWithTransactions extends Customer {
  transactions: Transaction[];
  status?: string;
  updatedBy?: string;
  __v?: number;
}

type NavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  'CustomerDetail'
>;

type CustomerDetailRouteProp = RouteProp<
  CustomerStackParamList,
  'CustomerDetail'
>;

const HeaderMenu = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <Menu>
    <MenuTrigger>
      <View style={styles.headerMenuButton}>
        <Text style={styles.headerMenuIcon}>⋮</Text>
      </View>
    </MenuTrigger>
    <MenuOptions customStyles={menuStyles}>
      <MenuOption onSelect={onEdit}>
        <Text style={styles.menuOptionText}>Chỉnh sửa</Text>
      </MenuOption>
      <MenuOption onSelect={onDelete}>
        <Text style={[styles.menuOptionText, { color: '#e74c3c' }]}>
          Xóa khách hàng
        </Text>
      </MenuOption>
    </MenuOptions>
  </Menu>
);

const menuStyles = {
  optionsContainer: {
    padding: 5,
    borderRadius: 8,
  },
  optionWrapper: {
    padding: 10,
  },
};

export default function CustomerDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CustomerDetailRouteProp>();
  const { customerId } = route.params;

  const [customerData, setCustomerData] =
    useState<CustomerWithTransactions | null>(null);

  useLayoutEffect(() => {
    const handleEdit = () => {
      navigation.navigate('EditCustomer', { customerId });
    };

    const handleDelete = () => {
      Alert.alert(
        'Xác nhận xóa',
        `Bạn có chắc chắn muốn xóa khách hàng "${customerData?.name}"?`,
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'Xóa',
            style: 'destructive',
            onPress: async () => {
              try {
                await CustomerService.deleteCustomer(customerId);
                Alert.alert('Thành công', 'Đã xóa khách hàng');
                navigation.goBack();
              } catch (error) {
                Alert.alert('Lỗi', error.message || 'Không thể xóa khách hàng');
              }
            },
          },
        ],
      );
    };

    navigation.setOptions({
      headerRight: () => (
        <HeaderMenu onEdit={handleEdit} onDelete={handleDelete} />
      ),
    });
  }, [navigation, customerData, customerId]);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const data = await CustomerService.getCustomerById(customerId);
        setCustomerData(data);
      } catch (error) {
        console.log('Error fetching customer detail:', error);
      }
    };
    fetchCustomerDetail();
  }, [customerId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      case 'pending':
        return 'Đang xử lý';
      default:
        return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'cancelled':
        return styles.statusCancelled;
      case 'pending':
        return styles.statusPending;
      default:
        return styles.statusPending;
    }
  };

  if (!customerData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>
            Không tìm thấy thông tin khách hàng
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const transactions = customerData.transactions || [];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Customer Info Card */}
          <View style={styles.customerInfoCard}>
            <Text style={styles.customerName}>{customerData.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số điện thoại:</Text>
              <Text style={styles.infoValue}>{customerData.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hạng thành viên:</Text>
              <Text style={[styles.infoValue, styles.loyaltyText]}>
                {customerData.loyalty}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tổng chi tiêu:</Text>
              <Text style={styles.totalSpent}>
                {customerData.totalSpent.toLocaleString('vi-VN')}đ
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày tạo:</Text>
              <Text style={styles.infoValue}>
                {formatDate(customerData.createdAt)}
              </Text>
            </View>
          </View>

          {/* Transactions Section */}
          <View style={styles.transactionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lịch sử giao dịch</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{transactions.length}</Text>
              </View>
            </View>

            {transactions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
              </View>
            ) : (
              transactions.map((transaction, index) => (
                <View
                  style={styles.transactionCard}
                  key={transaction._id || index}
                >
                  <View style={styles.transactionHeader}>
                    <Text style={styles.transactionId}>#{transaction.id}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        getStatusStyle(transaction.status),
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {getStatusText(transaction.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.servicesContainer}>
                    <Text style={styles.servicesLabel}>Dịch vụ:</Text>
                    {transaction.services.map((service, idx) => (
                      <View style={styles.serviceRow} key={service._id || idx}>
                        <Text style={styles.serviceName}>
                          • {service.name}{' '}
                          {service.quantity ? `x${service.quantity}` : ''}
                        </Text>
                        <Text style={styles.servicePrice}>
                          {service.price.toLocaleString('vi-VN')}đ
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.priceContainer}>
                    {transaction.priceBeforePromotion !== transaction.price && (
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Giá gốc:</Text>
                        <Text style={styles.originalPrice}>
                          {transaction.priceBeforePromotion.toLocaleString(
                            'vi-VN',
                          )}
                          đ
                        </Text>
                      </View>
                    )}
                    <View style={styles.priceRow}>
                      <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                      <Text style={styles.finalPrice}>
                        {transaction.price.toLocaleString('vi-VN')}đ
                      </Text>
                    </View>
                  </View>

                  <View style={styles.transactionFooter}>
                    <Text style={styles.createdBy}>
                      Nhân viên: {transaction.createdBy.name}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {formatDate(transaction.createdAt)}
                    </Text>
                  </View>
                </View>
              ))
            )}
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#636e72',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  customerInfoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  customerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  infoLabel: {
    fontSize: 14,
    color: '#636e72',
  },
  infoValue: {
    fontSize: 14,
    color: '#2d3436',
    fontWeight: '500',
  },
  loyaltyText: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
  totalSpent: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: 'bold',
  },
  transactionsSection: {
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
  emptyContainer: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#636e72',
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#00b894',
  },
  statusCancelled: {
    backgroundColor: '#d63031',
  },
  statusPending: {
    backgroundColor: '#fdcb6e',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  servicesContainer: {
    marginBottom: 12,
  },
  servicesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636e72',
    marginBottom: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  serviceName: {
    fontSize: 14,
    color: '#2d3436',
    flex: 1,
  },
  servicePrice: {
    fontSize: 14,
    color: '#636e72',
    fontWeight: '500',
  },
  priceContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 14,
    color: '#636e72',
  },
  originalPrice: {
    fontSize: 14,
    color: '#636e72',
    textDecorationLine: 'line-through',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  finalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  transactionFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  createdBy: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#b2bec3',
  },
  headerMenuButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerMenuIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuOptionText: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
