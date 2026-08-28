import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaStorage, TouchableOpacity, SafeAreaView } from 'react-native';
import { generateOfflineTOTP } from '../utils/totp';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricPassScreen() {
  const [totpCode, setTotpCode] = useState('------');
  const [authStatus, setAuthStatus] = useState(false);

  const authenticateAndGenerate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to generate masterclass secure pass'
      });
      if (result.success) {
        setAuthStatus(true);
        const code = await generateOfflineTOTP('NANCIP_SECURE_ENCLAVE_KEY_2026');
        setTotpCode(code);
      }
    }
  };

  useEffect(() => {
    authenticateAndGenerate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Offline Terminal Pass</Text>
        <Text style={styles.subtitle}>Time-Synced Cryptographic Token</Text>
        
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{authStatus ? totpCode : 'LOCKED'}</Text>
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={authenticateAndGenerate}>
          <Text style={styles.refreshText}>Re-verify & Refresh Token</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: '#111827', width: '100%', maxWidth: 360, borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#1f293d' },
  title: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { color: '#94a3b8', fontSize: 14, marginBottom: 24 },
  codeContainer: { backgroundColor: '#161e2e', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: '#38bdf8' },
  codeText: { color: '#38bdf8', fontSize: 36, fontWeight: 'bold', letterSpacing: 6 },
  refreshButton: { backgroundColor: '#0284c7', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  refreshText: { color: '#ffffff', fontWeight: '600' }
});
  
