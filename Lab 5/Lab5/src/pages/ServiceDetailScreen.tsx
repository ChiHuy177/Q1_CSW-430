/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../../App';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Pencil, Trash } from 'lucide-react-native';
import { SpaService } from '../services/SpaService';

type RouteProps = RouteProp<ServicesStackParamList, 'ServiceDetail'>;
type NavigationProps = NativeStackNavigationProp<
  ServicesStackParamList,
  'ServiceDetail'
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
        <Text style={styles.menuOptionText}>
          <Pencil /> Chỉnh sửa
        </Text>
      </MenuOption>
      <MenuOption onSelect={onDelete}>
        <Text style={[styles.menuOptionText, { color: '#e74c3c' }]}>
          <Trash /> Xóa dịch vụ
        </Text>
      </MenuOption>
    </MenuOptions>
  </Menu>
);
export default function ServiceDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { service } = route.params;

  const handleDeleteService = useCallback(async () => {
    const response = await SpaService.deleteService(service._id);
    console.log(response);
    Alert.alert(response.message);
    navigation.goBack();
  }, [navigation, service._id]);

  const confirmDelete = useCallback(() => {
    Alert.alert(
      'Xóa dịch vụ',
      'Bạn có chắc chắn muốn xóa dịch vụ này không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: handleDeleteService,
        },
      ],
      { cancelable: true },
    );
  }, [handleDeleteService]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderMenu
          onEdit={() => navigation.navigate('EditService', { service })}
          onDelete={confirmDelete}
        />
      ),
    });
  }, [confirmDelete, navigation, service]);

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

  const handleBooking = () => {
    console.log('Booking service:', service.name);
  };

  return (
    <>
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom']}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>{service.name}</Text>
            <Text style={styles.heroPrice}>
              {service.price.toLocaleString('vi-VN')}đ
            </Text>
          </View>

          {/* Details Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mã dịch vụ</Text>
              <Text style={styles.detailValue}>
                {service._id.slice(-8).toUpperCase()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Thời gian</Text>
              <Text style={styles.detailValue}>60 phút</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ngày tạo</Text>
              <Text style={styles.detailValue}>
                {formatDate(service.createdAt)}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={handleBooking}
          >
            <Text style={styles.bookingButtonText}>Đặt lịch ngay</Text>
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
    paddingBottom: 60,
    alignItems: 'center',
  },
  serviceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 40,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  heroPrice: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  detailsCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
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
  },
  detailValue: {
    fontSize: 15,
    color: '#2d3436',
    fontWeight: '500',
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
  headerMenuButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerMenuIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuOptionText: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#2d3436',
  },
});

const menuStyles = {
  optionsContainer: {
    borderRadius: 12,
    marginTop: 50,
    padding: 5,
  },
  optionWrapper: {
    paddingVertical: 4,
  },
};
