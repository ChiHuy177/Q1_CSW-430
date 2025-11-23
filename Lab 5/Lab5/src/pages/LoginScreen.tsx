/* eslint-disable react-native/no-inline-styles */
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  setIsLoggedIn: (value: boolean) => void;
}

const { width } = Dimensions.get('window');

export default function LoginScreen({ setIsLoggedIn }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      const response = await AuthService.login(phone, password);
      AsyncStorage.setItem('token', response.token);
      AsyncStorage.setItem('userName', response.name);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', 'Đăng nhập thất bại');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#9b9b9b"
              returnKeyType="next"
            />
          </View>

          <View style={[styles.inputWrapper, styles.passwordWrapper]}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { flex: 1 }]}
              secureTextEntry={secure}
              placeholderTextColor="#9b9b9b"
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => setSecure(s => !s)}
              style={styles.eyeButton}
              accessibilityLabel={secure ? 'Show password' : 'Hide password'}
            >
              {/* Simple eye icon using emoji to avoid external icon libs */}
              <Text style={styles.eye}>{secure ? <Eye /> : <EyeOff />}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* bottom black border like in screenshot */}
      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

const THEME = {
  pink: '#f2546b', // button / title
  lightBg: '#f4f4f4',
  inputBorder: '#e6e5e8',
  grey: '#9b9b9b',
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.lightBg,
  },
  topBar: {
    height: 10,
    backgroundColor: THEME.pink,
  },
  bottomBar: {
    height: 10,
    backgroundColor: '#0a0a0a',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: Math.min(420, width - 40),
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    color: THEME.pink,
    marginBottom: 28,
    // add letter spacing to match screenshot feel
    letterSpacing: 0.5,
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.inputBorder,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    // subtle shadow (android) / elevation
    elevation: 1,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  eyeButton: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    fontSize: 20,
    opacity: 0.7,
  },
  loginBtn: {
    marginTop: 8,
    width: '100%',
    backgroundColor: THEME.pink,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
