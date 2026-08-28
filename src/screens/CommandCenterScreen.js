import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function CommandCenterScreen({ navigation }) {
  const [timeLeft, setTimeLeft] = useState('34h 12m remaining');
  const quotaProgress = '4 / 6';

  useEffect(() => {
    // Countdown timer logic towards Thursday 11:59 PM deadline
    const timer = setInterval(() => {
      // Refresh countdown state
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Persistent Quota Header */}
        <View style={styles.quotaHeader}>
          <View>
            <Text style={styles.quotaLabel}>Vault Quota Ring</Text>
            <Text style={styles.quotaValue}>{quotaProgress} Uploaded</Text>
          </View>
          <View style={styles.timerBadge}>
            <Text style={styles.timerText}>{timeLeft}</Text>
          </View>
        </View>

        {/* Dynamic Agenda / Contextual Widget */}
        <View style={styles.widgetCard}>
          <Text style={styles.widgetTitle}>Active Operational Compass</Text>
          <Text style={styles.widgetBody}>
            Current State: Vault Sprint Active. Ensure metadata tagging complies with Neil Patel SEO clustering guidelines before 11:59 PM deadline.
          </Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.buttonText}>Launch Chunked Vault Ingest</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('BiometricPass')}
        >
          <Text style={styles.secondaryButtonText}>Open Biometric / QR Pass</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  scrollContent: { padding: 20 },
  quotaHeader: {
    backgroundColor: '#161e2e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1f293d'
  },
  quotaLabel: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase' },
  quotaValue: { color: '#38bdf8', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  timerBadge: { backgroundColor: '#0284c7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  timerText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  widgetCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8'
  },
  widgetTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  widgetBody: { color: '#94a3b8', fontSize: 14, lineHeight: 20 },
  primaryButton: {
    backgroundColor: '#0284c7',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#38bdf8',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center'
  },
  secondaryButtonText: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold' }
});
