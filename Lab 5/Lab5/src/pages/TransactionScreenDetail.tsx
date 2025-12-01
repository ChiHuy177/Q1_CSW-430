/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { TransactionService } from '../services/TransactionService';
import { Transaction } from './TransactionScreen';

type TransactionDetailRouteProp = RouteProp<
  { TransactionDetail: { transactionId: string } },
  'TransactionDetail'
>;

export default function TransactionScreenDetail() {
  const route = useRoute<TransactionDetailRouteProp>();
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        setLoading(true);
        const data = await TransactionService.getTransactionById(transactionId);
        setTransaction(data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin giao dịch');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [transactionId]);

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

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#27ae60';
      case 'pending':
        return '#f39c12';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e91e63" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Không tìm thấy giao dịch</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>Mã giao dịch</Text>
          <Text style={styles.heroTitle}>{transaction.id}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(transaction.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {getStatusText(transaction.status)}
            </Text>
          </View>
        </View>

        {/* Price Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Tổng quan thanh toán</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Giá gốc</Text>
            <Text style={styles.priceValue}>
              {formatCurrency(transaction.priceBeforePromotion)}
            </Text>
          </View>

          {transaction.priceBeforePromotion !== transaction.price && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Giảm giá</Text>
              <Text style={[styles.priceValue, { color: '#27ae60' }]}>
                -{formatCurrency(transaction.priceBeforePromotion - transaction.price)}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(transaction.price)}
            </Text>
          </View>
        </View>

        {/* Customer Info Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tên khách hàng</Text>
            <Text style={styles.detailValue}>{transaction.customer.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Số điện thoại</Text>
            <Text style={styles.detailValue}>{transaction.customer.phone}</Text>
          </View>
        </View>

        {/* Services Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Dịch vụ đã sử dụng</Text>

          {transaction.services.map((service, index) => (
            <View key={service._id} style={styles.serviceItem}>

              <View style={styles.serviceDetails}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>
                  {formatCurrency(service.price)}
                </Text>
              </View>
              {index < transaction.services.length - 1 && (
                <View style={styles.serviceDivider} />
              )}
            </View>
          ))}
        </View>

        {/* Transaction Info Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Thông tin giao dịch</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Người tạo</Text>
            <Text style={styles.detailValue}>
              {transaction.createdBy.name}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ngày tạo</Text>
            <Text style={styles.detailValue}>
              {formatDate(transaction.createdAt)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cập nhật lần cuối</Text>
            <Text style={styles.detailValue}>
              {formatDate(transaction.updatedAt)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID giao dịch</Text>
            <Text style={[styles.detailValue, { fontSize: 12 }]}>
              {transaction._id}
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
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
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#636e72',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '500',
  },
  heroSection: {
    backgroundColor: '#e91e63',
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: -30,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 15,
    color: '#636e72',
  },
  priceValue: {
    fontSize: 15,
    color: '#2d3436',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 15,
    color: '#636e72',
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    color: '#2d3436',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 15,
    color: '#e91e63',
    fontWeight: '500',
  },
  serviceDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 62,
    right: 0,
  },
});
