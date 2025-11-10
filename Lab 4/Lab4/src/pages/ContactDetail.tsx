import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Contact } from '../stores/ApplicationStore';

interface ContactDetailPageProps {
  navigation: any;
  route: any;
}

export const ContactDetailPage = ({ route }: ContactDetailPageProps) => {
  const { contact }: { contact: Contact } = route.params;

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleToggleFavorite = () => {
    // Xử lý thêm/xóa favorite
    console.log('Toggle favorite');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        {/* Header Banner */}
        <View style={styles.banner}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image source={{ uri: contact.picture }} style={styles.avatar} />
          </View>

          {/* Contact Info */}
          <Text style={styles.name}>{contact.name}</Text>
          <TouchableOpacity onPress={() => handleCall(contact.phone)}>
            <Text style={styles.phone}>📞 {contact.phone}</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Details List */}
        <View style={styles.detailsContainer}>
          {/* Email */}
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => handleEmail(contact.email)}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>✉️</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{contact.email}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Work Phone */}
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => handleCall(contact.phone)}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>📞</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Work</Text>
              <Text style={styles.detailValue}>{contact.phone}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Personal Phone */}
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => handleCall(contact.phone)}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>📱</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Personal</Text>
              <Text style={styles.detailValue}>{contact.phone}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.favoriteIcon}>
              {contact.favorite ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#0000FF',
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    padding: 4,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginLeft: 56,
  },
  favoriteButton: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  favoriteIcon: {
    fontSize: 30,
  },
});
